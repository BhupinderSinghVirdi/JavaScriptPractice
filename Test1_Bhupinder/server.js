const express = require("express");
const fs = require("fs");

// Initialize express app
const app = express();

// assigning the port number for deployment server and local too
const PORT = process.env.PORT || 5500;

// making use of the express library to read/decode the URL request
app.use(express.urlencoded({ extended: true }));

var stock;

//method to read json synchronuously i.e increase modularity
function load_json() {
    let myData = fs.readFileSync("T1_datasetA.json");
    stock = JSON.parse(myData);
    return stock;
  }

/* 
    /stdata route will display all the data inside of the JSON file.
*/

app.get("/stdata", (req, res, next) => {
      stock = load_json();
      console.log("stock data has been loaded on the server.");
      next();
    },(req, res) => {
      stock = load_json();
      res.send(stock);
    }
  );


/*
    /stdata
*/

app.get("/stdata/:index", (req, res) => {
    console.log("here")
    let index = req.params.index;
    stock = load_json();
    console.log(stock)
    result = "Error!, invalid input.";
    stock.forEach((element) => {
      if (element.id == index) {
        res.send(element);
      }
    });
  });


// regex route

app.get("/stdata/industry/*gas*",(req,res) => {
    input = req.params;
    stock = load_json();
    console.log(input);
    const industry = stock.filter((st) => {
    return stock.industry.includes(input)
    });
    res.send(industry)
})

// Listen on a port
app.listen(PORT, () => console.log(`Applications is running at: ${PORT}`));