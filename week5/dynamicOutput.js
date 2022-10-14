const express = require("express");
const app = express();
const exphbs = require('express-handlebars');

const HTTP_PORT = process.env.PORT || 8080;

app.set('view engine', '.hbs');
app.engine('.hbs', exphbs.engine({ extname:'.hbs' }));

app.get("/getData", function (req, res) {
  var someData = {
    name: "John",

    age: 23,

    occupation: "developer",

    company: "Scotiabank",
  };

  res.json(someData);
});

app.get("/viewData", function (req, res) {
  var someData = {
    name: "John",

    age: 23,

    occupation: "developer",

    company: "Scotiabank",
  };

  var htmlString =
    "<!doctype html>" +
    "<html>" +
    "<head>" +
    "<title>" +
    "View Data" +
    "</title>" +
    "</head>" +
    "<body>" +
    "<table border='1'>" +
    "<tr>" +
    "<th>" +
    "Name" +
    "</th>" +
    "<th>" +
    "Age" +
    "</th>" +
    "<th>" +
    "Occupation" +
    "</th>" +
    "<th>" +
    "Company" +
    "</th>" +
    "</tr>" +
    "<tr>" +
    "<td>" +
    someData.name +
    "</td>" +
    "<td>" +
    someData.age +
    "</td>" +
    "<td>" +
    someData.occupation +
    "</td>" +
    "<td>" +
    someData.company +
    "</td>" +
    "</tr>" +
    "</table>" +
    "</body>" +
    "</html>";

  //res.send(htmlString);
  res.render('viewData',{
    'data': someData,
    'layout': false
  })
});


app.listen(HTTP_PORT);