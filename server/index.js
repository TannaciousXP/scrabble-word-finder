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
  let listOfWords = [];  
  getAll(words => {
    words = words.filter(ele => ele.length <= chars.length);
    words = words.filter(word => {
      let copyStr = chars.slice();
      return word.split('').every(char => {
        if (copyStr.indexOf(char) !== -1) {
          copyStr.splice(copyStr.indexOf(char), 1);
          return true;
        } else {
          return false;

        }
        
      });
    });
    res.setHeader('Access-Control-Allow-Origin', '*');  
    res.json(words);
  });
});



app.listen(3000, () => {
  console.log('Scrabble');
});