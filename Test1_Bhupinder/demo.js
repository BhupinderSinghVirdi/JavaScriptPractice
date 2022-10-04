const express = require("express");

const app = express();

app.use(function (req, res, next) {
  console.log("Starting....");
  next();
});

//new middleware which will be called when the /user route is executed.
app.use("/user", (req,res, next) => {
    console.log("new middleware for the route /user");
    next();
})

app.get("/greeting", (req, res) => {
  let responseText = "Hello ";
  res.send(responseText);
});

// route not found handler
//will execute is nothing is specified in the the route.
app.get("*", (req,res) => {
    res.status(404).send("Route Not Found!!")
})

app.listen(3000);
