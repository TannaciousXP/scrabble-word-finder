const express = reuqire('express');
const app = express();
const fs = require('fs');



app.get(`/lookup/:leters`, (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');  
});



app.listen(3000, () => {
  console.log('Scrabble');
});