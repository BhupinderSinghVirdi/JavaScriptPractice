var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("bhupinder_week9");
  dbo.collection("mycourses").findOne({}, function (err, result) {
    if (err) throw err;
    console.log(result.courseName);
    db.close();
  });
});

