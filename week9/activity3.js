const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployments connection string.
const uri = "mongodb+srv://admin:admin@semester3web.0bbcsui.mongodb.net/test";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    // set namespace
    const database = client.db("sample_restaurants");
    const coll = database.collection("restaurants");

    // define pipeline
    const agg = [
      { $sort: { zipcode: -1 } },
      { $limit: 5 },
    ];

    // run pipeline
    const result = await coll.aggregate(agg);

    // print results
    await result.forEach((doc) => console.log(doc));
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
