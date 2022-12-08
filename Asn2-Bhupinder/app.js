/********************************************************************************** 
 * ITE5315 – Assignment 2* I declare that this assignment is my own work in accordance with Humber Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source* (including web sites) or distributed to other students.
 *  Name: ____BhupinderSinghVirdi____ 
 * Student ID: ___N01435365___ 
 * Date: ___30/10/22___
 * **********************************************************************************/

// importing all the import libraries
var express = require("express");
var path = require("path");
var app = express();
const exphbs = require("express-handlebars");
const fs = require("fs");
const { mainModule } = require("process");

//global definition to support direct routes.
var books;

// declaring the port for OS hosting and dynamic handling
const port = process.env.port || 3000;

// Middleware method to specific images and css files
app.use(express.static(path.join(__dirname, "public")));

/*
    Design a custom helper for changing “0” to “zero”.
*/
const HBS = exphbs.create({
    //Create custom HELPER
    helpers: {
        changeZero: function (context, options) {
            if (context == 0)
                return "zero";
            else
                return context;
        },
        strong: function(options){
            return '<strong>' + options.fn(this);
        }
    },
    defaultLayout: 'main.hbs'
});

//Declaring the templating engine for the application
app.engine(".hbs", HBS.engine);
app.set("view engine", ".hbs");

// making use of the express library to read/decode the URL request
app.use(express.urlencoded({ extended: true }));

// Various routes for the application
app.get("/", function (req, res) {
  res.render("index", { title: "Express"});
});

app.get("/users", function (req, res) {
  res.render("index", { title: "users", message: "respond with a resource"});
});

//Assignment 1 --CODE
//method to read json synchronuously i.e increase modularity
function load_json() {
  let myData = fs.readFileSync("mydata.json");
  books = JSON.parse(myData);
  return books;
}

/*
    Step-6:
    Add the Assignment1 code into this template. So the assignment1 form and outputshould be displayed in the content area of the layout.

*/

app.get(
  "/data",
  (req, res, next) => {
    books = load_json();
    console.log(
      "Books data has been loaded on the server, to display try 'data/display' route"
    );
    next();
  },
  (req, res) => {
    books = load_json();
    res.render("index", {title : "getData" , data : JSON.stringify(books)});
  }
);

app.get("/stdata/:index", (req, res) => {
  let index = req.params.index;
  stock = load_json();
  result = "Error!, invalid input.";
  stock.forEach((element) => {
    if (element._id == index) {
        console.log(element)
      res.render("searchData", { title : "stdataIndex", data: element});
    }
  });
});

// FOrm is in the getDataSearchIsbn.hbs file for the get request on the  /data/search/isbn route.

app.get("/data/search/isbn", (req, res) => {
  res.render("getDataSearchIsbn", { title: "searchIsbn"});
});

app.post("/data/search/isbn", (req, res) => {
  let input = req.body.isbn;
  result = "Error!, invalid input.";
  books = load_json();
  books.forEach((element) => {
    if (element.isbn === input) {
      result = element;
    }
  });
  res.render("searchData", {title: "SearchIsbn", data : result});
});

// FOrm is in the getDataSearchTitle.hbs file for the get request on the  /data/search/title route.

app.get("/data/search/title", (req, res) => {
  res.render("getDataSearchTitle",{ title: "SearchTitle"});
});

app.post("/data/search/title", (req, res) => {
  let input = req.body.title;
  books = load_json();
  const titles = books.filter((book) => {
    return book.title.includes(input);
  });
  res.render("dataSearchTitle",{title: "searchTitle", data: titles});
});

/*
    Step 7: Design a new route “/allData” to display all books info in html table output using allData.hbs view.
*/

app.get(
    "/allData",
    (req, res, next) => {
      books = load_json();
      console.log(
        "Books data has been loaded on the server, to display try 'data/display' route"
      );
      next();
    },
    (req, res) => {
      books = load_json();
      res.render("allData", {title : "getData" , data : books});
    }
  );

/*
    Routes to handle errors and 404
*/

app.get("/wrongRoute || /404", function (req, res) {
    res.statusCode = 404;
    res.render("error",{title: "Error", message: `${res.statusCode} : requested URL not found!`});
  });

app.get("*", function (req, res) {
  res.render("error", { title: "Error", message: "Wrong Route" , layout: false});
});

// making sure the application can run on 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});