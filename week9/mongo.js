var mongo = require("mongodb");

var MongoClient = require("mongodb").MongoClient;
//Connection URL
var url = "mongodb://localhost:27017/my_database";
try {
  db = MongoClient.connect(url);
  console.log("Connected successfully!");
} catch (err) {
  // Handle error
  console.log("Connection failed!");
}


db.pets.insertMany( [
  { name: "Mickey", species: "Gerbil" },
  { name: "Davey bungooligan", species: "Piranha" },
  { name: "Suzy B", species: "Cat" },
  { name: "Mikey", species: "Hotdog" },
  { name: "Terrence", species: "Sausagedog" },
  { name: "philomena Jones", species: "Cat" },
] );