// setup our requires
const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const { body, check, validationResult } = require("express-validator");

const HTTP_PORT = process.env.PORT || 8000;

//setting the encryption type
app.use(express.json());

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// multer requires a few options to be setup to store files with file extensions
// by default it won't store extensions for security reasons
const storage = multer.diskStorage({
  destination: "./public/photos/",
  filename: function (req, file, cb) {
    // we write the filename as the current date down to the millisecond
    // in a large web service this would possibly cause a problem if two people
    // uploaded an image at the exact same time. A better way would be to use GUID's for filenames.
    // this is a simple example.
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

//tell multer to use the diskStorage function for naming the files
const upload = multer({storage: storage})

// setup the static folder that static resources can load from
// we need this so that the photo can be loaded from the server
// by the browser after sending it
app.use(express.static("./public/"));

// setup a route on the 'root' of the url that has our form
// IE: http://localhost/
app.get("/", (req, res) => {
  // send the html view with our form to the client
  res.sendFile(path.join(__dirname, "/views/registerUser.html"));
});

// now add a route that we can POST the form data to
// IE: http://localhost/register-user
// add the middleware function (upload.single("photo")) for multer to process the file upload in the form
// the string you pass the single() function is the value of the
// 'name' attribute on the form for the file input element


app.post("/registerUser", 
    async (req,res,next) => {
        await body("email").isEmail().normalizeEmail().run(req),
        await body("password").isLength({ min: 5 }).run(req),
        upload.single("photo")
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
            }
        },
    (req, res) => {
        console.log(req.body)
        console.log(errors)
        const formData = req.body;
        const formFile = req.file;
        const dataReceived =
        `Your submission was received:<br/><br/>
        Your form data was:<br/>
        ${JSON.stringify(formData)}
        <br/><br/>
        Your File data was:<br/>
        ${JSON.stringify(formFile)} 
        <br/><p>This is the image you sent:<br/><img src='/photos/${formFile.filename}'/>`;
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }  
        
    res.send(dataReceived);
  });
  

 






app.listen(HTTP_PORT, onHttpStart);