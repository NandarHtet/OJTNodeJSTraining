const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const bodyParser = require('body-parser');
const { check, validationResult } =require('express-validator')
const app = express();

const writeStream = fs.createWriteStream('public/data.txt');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended :true}));

app.get('/', (req, res) => {
  res.render('index')
});

app.post('/', [
  check('userName', 'Name is required!!')
  .trim()
  .not()
  .isEmpty(),
  check('userPassword', 'Password is required!!')
  .trim()
  .not()
  .isEmpty(),
], (req,res) =>{

  const errors = validationResult(req)
   if(!errors.isEmpty()) {
    var alert = errors.array()
   }

  var userName = req.body.userName;
  var userPassword = req.body.userPassword;
  var data = {
    userName,
    userPassword 
  };

  writeStream.write(JSON.stringify(data));
  const readStream = fs.createReadStream('public/data.txt', 'utf-8');

  var resultData;

  readStream.on('data', (chunk) => {
    resultData = JSON.parse(chunk);
    res.render('index', { resultData:resultData, alert:alert });
  });

});

app.listen(5000, () => {
  console.log(`App listening on port 5000`);
});
