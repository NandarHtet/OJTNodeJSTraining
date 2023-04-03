const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/', function (req, res) {
  let date = req.body.date;
  let month = req.body.month;
  let year = req.body.year;

  let newDate = new Date();
  let d2 = newDate.getDate();
  let m2 = 1 + newDate.getMonth();
  let y2 = newDate.getFullYear();
  let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (date > d2) {
    d2 = d2 + months[m2 - 1];
    m2 = m2 - 1;
  }

  if (month > m2) {
    m2 = m2 + 12;
    y2 = y2 - 1;
  }

  let d = d2 - date;
  let m = m2 - month;
  let y = y2 - year;

  let resultAge;
  switch (true) {
    case y === 0:
      resultAge = `You are ${m} months and ${d} days old.`;
      break;
    case m === 0 && d === 0:
      resultAge = `You are ${y} years old.`;
      break;
    case m === 0:
      resultAge = `You are ${y} years and ${d} days old.`;
      break;
    case d === 0:
      resultAge = `You are ${y} years and ${m} months old.`;
      break;
    default:
      resultAge = `You are ${y} years, ${m} months, and ${d} days old.`;
      break;
  }

  const data = { resultAge };

  res.render('index', { data: data });

});

app.listen(5000, function () {
  console.log(`App listening on port 5000`);
});