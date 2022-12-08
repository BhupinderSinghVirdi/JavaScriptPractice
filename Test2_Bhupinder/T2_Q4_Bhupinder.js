const express = require("express");
const http = require('http')
const { body, check, validationResult } = require("express-validator");

app = http.createServer((req, res) => {
  if (req.url === "/registerUser") {
      body("name").isString(),
      body("age").isNumeric,

      (req, res) => {
        // Handle the request somehow
        console.log(req.body);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).send({ errors: errors.array() });
        }

        res.send(req.body());
      }
    }
});

app.listen(3000);
