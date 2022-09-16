"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 4000;

const {
  getProducts,
  getProductById,
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
  placeOrder,
  clearTheCart,
  getOrdersByEmail,
  getOrders,
  checkDeliverers,
  updateOrderStatus,
  // reloadHandler,
} = require("./handlers");

// reloadHandler();

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.static("public"))
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  /// REST endpoints
  .get("/api/get-products", getProducts)
  .get("/api/get-product-by-id/:id", getProductById)
  .get("/api/get-categories", getCategories)
  .get("/api/get-products-by-category/:category", getProductsByCategory)
  .get("/api/get-restaurants", getRestaurants)
  .get("/api/get-restaurant-by-id/:id", getRestaurantById)
  .get("/api/get-products-by-store/:id", getProductsByStore)
  .get("/api/get-cart/:email", getCart)
  .get("/api/get-orders-by-email/:email", getOrdersByEmail)
  .get("/api/get-orders", getOrders)
  .get("/api/check-deliverers/:email", checkDeliverers)

  // .get("/api/reload", reloadHandler)

  .patch("/api/add-to-cart", addToCart)
  .patch("/api/update-quantity-in-cart", updateQuantityInCart)
  .patch("/api/delete-item-from-cart", deleteItemFromCart)
  .patch("/api/clear-the-cart/:email", clearTheCart)
  .patch("/api/update-order-status", updateOrderStatus)

  .put("/api/create-user", createUser)
  .put("/api/place-order", placeOrder)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
