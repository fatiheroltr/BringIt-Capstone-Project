"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require("uuid");

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

const getRestaurants = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("CAPSTONE");
    const result = await db.collection("restaurants").find().toArray();
    client.close();

    result.length > 0
      ? res.status(200).json({
          status: 200,
          data: result,
          message: `All restaurants are loaded!`,
        })
      : res.status(404).json({
          status: 404,
          message: `Couldn't find any restaurant!`,
        });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getRestaurantById = async (req, res) => {
  const selectedRestaurant = parseInt(req.params.id);
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("CAPSTONE");
    const result = await db
      .collection("restaurants")
      .findOne({ _id: selectedRestaurant });
    client.close();

    result
      ? res.status(200).json({
          status: 200,
          data: result,
          message: `${selectedRestaurant} id loaded!`,
        })
      : res.status(404).json({
          status: 404,
          message: `Couldn't find any ${selectedRestaurant}!`,
        });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getProductsByStore = async (req, res) => {
  const storeId = parseInt(req.params.id);
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("CAPSTONE");
    const result = await db
      .collection("products")
      .find({ store_id: storeId })
      .toArray();
    client.close();

    result.length > 0
      ? res.status(200).json({
          status: 200,
          data: result,
          message: `Products are loaded!`,
        })
      : res.status(404).json({
          status: 404,
          message: `Couldn't find any product!`,
        });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getCart = async (req, res) => {
  const currentUserEmail = req.params.email;
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("CAPSTONE");
    const result = await db
      .collection("users")
      .findOne({ email: currentUserEmail });
    client.close();

    result
      ? res.status(200).json({
          status: 200,
          data: result.cart,
          message: `Cart is loaded!`,
        })
      : res.status(404).json({
          status: 404,
          message: `Couldn't find any product in cart!`,
        });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const addToCart = async (req, res) => {
  const { cartObject, currentUser } = req.body;
  const cartItem = {
    ...cartObject,
    id: req.body.cartObject._id,
    _id: uuidv4(),
  };

  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("CAPSTONE");

    const checkIfExist = await db.collection("users").count({
      $and: [
        { email: currentUser.email },
        { "cart.id": cartItem.id },
        { "cart.excludedIngredients": cartItem.excludedIngredients },
        { "cart.selectedOptions": cartItem.selectedOptions },
      ],
    });

    console.log("checkIfExist: ", checkIfExist);

    const result =
      checkIfExist > 0
        ? await db.collection("users").updateOne(
            {
              $and: [
                { email: currentUser.email },
                { "cart.id": cartItem.id },
                { "cart.selectedOptions": cartItem.selectedOptions },
                { "cart.excludedIngredients": cartItem.excludedIngredients },
              ],
            },
            { $inc: { "cart.$.selectedQuantity": +cartItem.selectedQuantity } }
          )
        : await db.collection("users").updateOne(
            {
              $and: [
                { email: currentUser.email },
                // { "cart.id": cartItem.id },
                // { "cart.excludedIngredients": cartItem.excludedIngredients },
                // { "cart.selectedOptions": cartItem.selectedOptions },
              ],
            },
            { $push: { cart: cartItem } }
          );

    client.close();

    result.modifiedCount > 0
      ? res.status(200).json({
          status: 200,
          success: true,
          data: result,
          message: `Cart updated!`,
        })
      : res.status(400).json({
          status: 400,
          message: `Error! Something went wrong.`,
        });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const updateQuantityInCart = async (req, res) => {
  const { updateObject, currentUser } = req.body;
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("CAPSTONE");
    const result = await db
      .collection("users")
      .updateOne(
        { email: currentUser.email, "cart._id": updateObject._id },
        { $inc: { "cart.$.selectedQuantity": +updateObject.action } }
      );
    client.close();

    result.modifiedCount > 0
      ? res.status(200).json({
          status: 200,
          data: result,
          message: `Item's quantity updated!`,
        })
      : res.status(404).json({
          status: 404,
          message: `Couldn't find the product in cart!`,
        });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const deleteItemFromCart = async (req, res) => {
  const { id, currentUser } = req.body;
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("CAPSTONE");
    const result = await db
      .collection("users")
      .updateOne(
        { email: currentUser.email },
        { $pull: { cart: { _id: id._id } } }
      );

    client.close();

    console.log("result: ", result.modifiedCount);

    result
      ? res.status(200).json({
          status: 200,
          success: true,
          data: result,
          message: `Item deleted from cart!`,
        })
      : res.status(404).json({
          status: 404,
          data: id,
          message: `Couldn't find the item!`,
        });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const createUser = async (req, res) => {
  const user = { ...req.body, _id: uuidv4() };
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("CAPSTONE");
    const checkIfExist = await db
      .collection("users")
      .count({ email: user.email });
    const result =
      checkIfExist === 0 && (await db.collection("users").insertOne(user));
    // : await db.collection("users").updateOne({ cart: user.cart });

    result &&
      res.status(200).json({
        status: 200,
        success: true,
        data: result,
        message: `New user created!`,
      });
    // : res.status(400).json({
    //     status: 400,
    //     data: user,
    //     message: `User already registered`,
    //   });
  } catch (err) {
    console.log("Error: ", err);
  }
};

// const validateUserToken = async (req, res) => {
//   const userToken = req.body;
//   console.log("userToken: ", userToken);
//   const client = new MongoClient(MONGO_URI);
//   try {
//     await client.connect();
//     const db = client.db("CAPSTONE");
//     const result = await db.collection("userToken").replaceOne(userToken);

//     result &&
//       res.status(200).json({
//         status: 200,
//         success: true,
//         data: result,
//         message: `New user validated!`,
//       });
//   } catch (err) {
//     console.log("Error: ", err);
//   }
// };

module.exports = {
  getCategories,
  getProductsByCategory,
  getRestaurantById,
  getProductsByStore,
  getRestaurants,
  getCart,
  addToCart,
  updateQuantityInCart,
  deleteItemFromCart,
  createUser,
};
