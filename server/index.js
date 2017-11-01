const express = require('express');
const app = express();
const fs = require('fs');
const dictionary = __dirname + '/../dictionary.txt';

let getAll = (cb => {
  fs.readFile(dictionary, 'utf8', (err, words) => {
    if (err) {
      cb(err);
    } else {
      words = words.trim().split('\n');
      cb(words);
    }
  });  
});

app.get(`/lookup/:letters`, (req, res) => {
  let chars = req.params.letters.split('');
  console.log(chars);
  let listOfWords = [];  
  getAll(words => {
    words = words.filter(ele => ele.length === chars.length);
    words = words.filter(word => {
      return chars.every(char => word.includes(char.toUpperCase()));
    });
    console.log(words.length);
    res.setHeader('Access-Control-Allow-Origin', '*');  
    res.json(words);
  });
});



app.listen(3000, () => {
  console.log('Scrabble');
});