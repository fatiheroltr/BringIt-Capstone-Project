const categories = require("./data/categories.json");
const restaurants = require("./data/restaurants.json");
const products = require("./data/products.json");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db("CAPSTONE");

  const categoriesData = await db
    .collection("categories")
    .insertMany(categories);
  // const restaurantsData = await db
  //   .collection("restaurants")
  //   .insertMany(restaurants);
  // const productsData = await db.collection("products").insertMany(products);

  categoriesData
    ? // restaurantsData &&
      // productsData
      console.log("Data imported successfully! ")
    : console.log("ERROR!");

  client.close();
};

batchImport();
