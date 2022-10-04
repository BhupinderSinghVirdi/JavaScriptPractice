/**********************************************************************************
 * ITE5315 – Assignment 1*
 * I declare that this assignment is my own work in accordance with Humber Academic Policy.*
 * * No part of this assignment has been copied manually or electronically from any other source*
 * (including web sites) or distributed to other students.**
 *  Name: ___Bhupinder Singh Virdi____ Student ID: ___N01435365____ Date: ____10/03/22____
 * **********************************************************************************/

/* 
    Step-1
    Create new Node/Express app, named “Asn1-yourname”
*/
// Import statements
const express = require("express");
const fs = require("fs");

// Initialize express app
const app = express();

// assigning the port number for deployment server and local too
const PORT = process.env.PORT || 5500;

// making use of the express library to read/decode the URL request
app.use(express.urlencoded({ extended: true }));

//global definition to support direct routes.
var books;

//method to read json synchronuously i.e increase modularity
function load_json() {
  let myData = fs.readFileSync("mydata.json");
  books = JSON.parse(myData);
  return books;
}

/* 
    Step-2
    Create a new server.js file, listen to the port 5500 and display your name/student ID when
    user opens the home page (http://localhost:5500/)
*/

app.get("/", function (req, res) {
  res.send("<h1>My name is Bhupinder and Humber number is: N01435365 </h1>");
});

/* 
    Step-4
    Modify server.js by loading the attached JSON file in the app when user access to the
    route : http://localhost:5500/data/
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
    res.send(books);
  }
);

/*
    Step-5:
    Modify server.js by handling a new route : http://localhost:5500/data/isbn/{index} in which
    when user enter the index_no, it displays the related book_isbn item in the list (in JSON data).
*/

app.get("/stdata/:index", (req, res) => {
  let index = req.params.index;
  stock = load_json();
  result = "Error!, invalid input.";
  stock.forEach((element) => {
    if (element._id == index) {
      res.send(element.isbn);
    }
  });
});

/*
    Step-6:
    Modify server.js by handling a new route : http://localhost:5500/data/search/isbn/ in which
    displays the following form:

*/

app.get("/data/search/isbn", (req, res) => {
  res.send(`<form method="POST" action="/data/search/isbn">
    <input type="text" id="isbn" name="isbn" placeholder="Enter ISBN">
    <input type="submit"></form>`);
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
  res.send(result);
});

/*
    Step-7:
    Modify server.js by handling a new route : http://localhost:5500/data/search/title/ . This is
    similar to Step6, however, you are asked to get book_title using the form and display related books
    in the output.

*/

app.get("/data/search/title", (req, res) => {
  res.send(`<form method="POST" action="/data/search/title">
      <input type="text" id="title" name="title" placeholder="Enter Title of Book">
      <input type="submit" value="submit"> </form>`);
});

app.post("/data/search/title", (req, res) => {
  let input = req.body.title;
  books = load_json();
  const titles = books.filter((book) => {
    return book.title.includes(input);
  });
  res.send(titles);
});

/* 
    Step-3
    Modify server.js by handling wrong route (404). So incase user open a wrong route
    (http://localhost:5500/wrongRoute ) , the program displays proper message and return proper
    status_error
*/

app.get("/wrongRoute || /404", function (req, res) {
    res.statusCode = 404;
    res.send(`${res.statusCode} : requested URL not found!`);
  });

// To handle any route which are not covered by the question
app.use("*", (req, res) => {
  res.statusCode(404).send(" requested URL not found!");
});

// Listen on a port
app.listen(PORT, () => console.log(`Applications is running at: ${PORT}`));