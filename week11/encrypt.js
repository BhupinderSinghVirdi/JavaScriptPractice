bcrypt = require("bcryptjs");
// Encrypt the plain text: "myPassword123"
bcrypt
  .hash("myPassword123", 100)
  .then((hash) => {
    //Hash the password using a Salt that was generatedusing 10 rounds
    console.log(hash);
    // TODO: Store the resulting "hash" value inthe DB
  })
  .catch((err) => {
    console.log(err);
    // Show any errors thatoccurred during the process
  });
