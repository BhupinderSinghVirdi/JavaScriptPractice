
// importing express library to make it an express app
const express = require("express");

// requiring express-validator library to use its function for feature validation like email.
const { body, check, validationResult } = require("express-validator");

//making it an express app here
const app = express();

// defining the type of request the express engine should expect.
//app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// route and post req to /checkuser for validating content.
app.post(
  "/checkuser",

  // use of express-validator throughout this block
  body("email").isEmail(),

  body("userID").isLength({ min: 8 }),

  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    // sending the request back to the client.
    res.send(req.body);
  }
);

// making the port 3000 accessible to the app.
app.listen(3000);
