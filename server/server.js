"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 4000;

const {
  getCategories,
  getProductsByCategory,
  getRestaurantById,
  getProductsByStore,
  getRestaurants,
} = require("./handlers");

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
  .get("/api/get-categories", getCategories)
  .get("/api/get-products-by-category/:category", getProductsByCategory)
  .get("/api/get-restaurants", getRestaurants)
  .get("/api/get-restaurant-by-id/:id", getRestaurantById)
  .get("/api/get-products-by-store/:id", getProductsByStore)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
