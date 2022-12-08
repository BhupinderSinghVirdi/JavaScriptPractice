const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";

async function findOne() {
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
  .catch((err) => {
    console.log(err);
  });

  if (!client) return;

  try {
    const db = client.db("Company");

    console.log(db)
    let collection = db.collection("customers");

    let res = await collection.findOne();

    console.log(res);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

findOne();
