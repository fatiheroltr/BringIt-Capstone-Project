"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const getCategories = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("CAPSTONE");
    const result = await db.collection("categories").find().toArray();
    client.close();

    result.length > 0
      ? res.status(200).json({
          status: 200,
          data: result,
          message: `All categories are loaded!`,
        })
      : res.status(404).json({
          status: 404,
          message: `Couldn't find any category!`,
        });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getProductsByCategory = async (req, res) => {
  const selectedCategory = req.params.category;
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("CAPSTONE");
    const result = await db
      .collection("products")
      .find({ category: selectedCategory })
      .toArray();
    client.close();

    result.length > 0
      ? res.status(200).json({
          status: 200,
          data: result,
          message: `${selectedCategory} products are loaded!`,
        })
      : res.status(404).json({
          status: 404,
          message: `Couldn't find any ${selectedCategory} products!`,
        });
  } catch (err) {
    console.log("Error: ", err);
  }
};

module.exports = { getCategories, getProductsByCategory };
