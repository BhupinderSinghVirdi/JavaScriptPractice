/**********************************************************************************
 * ITE5315 – Assignment 4* I declare that this assignment is my own work in accordance with Humber Academic Policy.
 * * No part of this assignment has been copied manually or electronically from any other source
 * * (including web sites) or distributed to other students.
 * ** Name: __Bhupinder Singh Virdi__ Student ID: _N01435365__ Date: _11/23/22__
 * **********************************************************************************/

var express = require("express");
var mongoose = require("mongoose");
var app = express();
var database = require("./config/database");
var bodyParser = require("body-parser"); // pull information from HTML POST (express4)

var port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ extended: "true" })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json

mongoose.connect(database.url);

var books = require("./models/books");

//get all books data from db
app.get("/api/books", function (req, res) {
  // use mongoose to get all todos in the database
  books.find(function (err, books) {
    // if there is an error retrieving, send the error otherwise send data
    if (err) res.send(err);
    res.json(books); // return all employees in JSON format
  });
});

// get a book with ID of 1
app.get("/api/books/:_id", function (req, res) {
  let id = req.params._id;
  books.findById(id, function (err, book) {
    if (err) res.send(err);
    res.json(book);
  });
});

// get a book with ISBN of 1
app.get("/api/books/isbn/:isbn", function (req, res) {
  let isbn = req.params.isbn;
  books.find({isbn}, function (err, data) {
    if (err) res.send(err);
    console.log(data)
    res.json(data);
  });
});

// create book and send back all books after creation
app.post("/api/books", function (req, res) {
  // create mongose method to create a new record into collection
  console.log(req.body);

  books.create(
    {
      _id: req.body._id,
      title: req.body.title,
      isbn: req.body.isbn,
      pageCount: req.body.pageCount,
      publishedDate: req.body.publishedDate,
      thumbnailUrl: req.body.thumbnailUrl,
      shortDescription: req.body.shortDescription,
      longDescription: req.body.longDescription,
      status: req.body.status,
      authors: [req.body.authors],
      categories: [req.body.categories],
    },
    function (err, book) {
      if (err) res.send(err);

      // get and return all the books after newly created employe record
      books.find(function (err, book) {
        if (err) res.send(err);
        res.json(book);
      });
    }
  );
});

// update employee and send back all books after creation
app.put("/api/books/:_id", function (req, res) {
  // create mongose method to update an existing record into collection
  console.log(req.body);

  let id = req.params._id;
  var data = {
    title: req.body.title,
    pageCount: req.body.pageCount,
  };

  // save the user
  books.findByIdAndUpdate(id, data, function (err, employee) {
    if (err) throw err;

    res.send("Successfully! books updated - " + employee.name);
  });
});

// delete a employee by id
app.delete("/api/books/:_id", function (req, res) {
  console.log(req.params._id);
  let id = req.params._id;
  books.remove(
    {
      _id: id,
    },
    function (err) {
      if (err) res.send(err);
      else res.send("Successfully! books has been Deleted.");
    }
  );
});

// delete a employee by isbn
app.delete("/api/books/isbn/:isbn", function (req, res) {
  console.log(req.params.isbn);
  let id = req.params.isbn;
  books.remove(
    {
      isbn: id,
    },
    function (err) {
      if (err) res.send(err);
      else res.send("Successfully! books has been Deleted.");
    }
  );
});


app.listen(port);
console.log("App listening on port : " + port);