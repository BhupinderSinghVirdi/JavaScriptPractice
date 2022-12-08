// importing all the import libraries
var express = require("express");
var path = require("path");
var app = express();
const exphbs = require("express-handlebars");
const fs = require("fs");
const { mainModule } = require("process");
const { json } = require("express");

// declaring the port for OS hosting and dynamic handling
const port = process.env.port || 3000;

// Middleware method to specific images and css files
app.use(express.static(path.join(__dirname, "public")));

const HBS = exphbs.create({
  helpers: {
    calculator: function (num) {
      return num + 10;
    },

    shapper: function (options) {
      return "<i><u><b>" + options.fn(this) + "</b></u></i>";
    },
  },
  defaultLayout : 'main.hbs'
});

//Declaring the templating engine for the application
app.engine(".hbs", HBS.engine);
app.set("view engine", ".hbs");

// making use of the express library to read/decode the URL request
app.use(express.urlencoded({ extended: true }));

//method to read json synchronuously i.e increase modularity
function load_json() {
  let myData = fs.readFileSync("T2_Q3_data.json");
  jsonData = JSON.parse(myData);
  return jsonData;
}

app.get("/data", function (req, res) {
  jsonData = load_json();
  console.log(jsonData)
  res.render("T2_Q3_Bhupinder_hbs", { title: "Q3", data: jsonData});
});

app.get("*", function (req, res) {
  res.render("main", {
    title: "Error",
    message: "Wrong Route",
    layout: false,
  });
});

// making sure the application can run on 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
