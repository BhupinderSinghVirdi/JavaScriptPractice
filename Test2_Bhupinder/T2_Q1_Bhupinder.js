// importing all the import libraries
var express = require("express");
var path = require("path");
var app = express();

const exphbs = require("express-handlebars");

const HBS = exphbs.create({
  helpers: {
    calculator: function (num) {
      return num + 10;
    },

    shapper: function (BhupinderSinghVirdi) {
      return "<i><u><b>" + BhupinderSinghVirdi.fn(this) + "</b></u></i>";
    },
  },
  defaultLayout: 'main.hbs'
});

//Declaring the templating engine for the application
app.engine(".hbs", HBS.engine);
app.set("view engine", ".hbs");

// Middleware method to specific images and css files
app.use(express.static(path.join(__dirname, "public")));

// making use of the express library to read/decode the URL request
app.use(express.urlencoded({ extended: true }));

const port = process.env.port || 3000;

// Various routes for the application
app.get("/", function (req, res) {
  res.render("T2_Q1_Bhupinder_hbs", { title : "Q1", message: "This is the question 1 of test2." });
});


// making sure the application can run on 3000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });