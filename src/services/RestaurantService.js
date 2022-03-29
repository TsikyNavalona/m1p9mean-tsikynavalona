require("dotenv").config();
const { encrypt, decrypt } = require("../config/crypto");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const passport = require("passport");

import Restaurant from "../models/restaurant";

let showAllRestaurant = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json({ status: "200", datas: restaurants });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let addRestaurant = async (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    description: req.body.description,
    password: req.body.password,
    number: req.body.number,
    email: req.body.email,
    adress: req.body.adress,
    logo: req.body.logo,
  });
  try {
    restaurant.password = crypto
      .createHash("sha256")
      .update(restaurant.password)
      .digest("base64");
    const newRestaurant = await restaurant.save();
    res.status(201).json({ status: "200", datas: newRestaurant });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

let showRestaurantById = async (req, res, next) => {
  let restaurant;
  try {
    restaurant = await Restaurant.findById(req.params.id);
    if (restaurant == null) {
      return res.status(404).json({ message: "Cannot find restaurant" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.json({ status: "200", datas: restaurant });
};

let showRestaurantByIdV2 = function (id, callback) {
  Restaurant.findById(id, callback);
};

let updateRestaurantById = async (req, res, next) => {
  let restaurant;
  try {
    restaurant = await Restaurant.findById(req.params.id);
    if (restaurant == null) {
      return res.status(404).json({ message: "Cannot find restaurant" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  if (req.body.name != null) {
    restaurant.name = req.body.name;
  }
  if (req.body.description != null) {
    restaurant.description = req.body.description;
  }
  if (req.body.password != null) {
    restaurant.password = encrypt(req.body.password).content;
  }
  if (req.body.number != null) {
    restaurant.number = req.body.number;
  }
  if (req.body.email != null) {
    restaurant.email = req.body.email;
  }
  if (req.body.adress != null) {
    restaurant.adress = req.body.adress;
  }
  if (req.body.logo != null) {
    restaurant.logo = req.body.logo;
  }
  try {
    const updatedRestaurant = await restaurant.save();
    res.json({ status: "200", datas: updatedRestaurant });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

let deleteRestaurantById = async (req, res, next) => {
  let restaurant;
  try {
    restaurant = await Restaurant.findById(req.params.id);
    if (restaurant == null) {
      return res.status(404).json({ message: "Cannot find restaurant" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  try {
    await restaurant.remove();
    res.json({ status: "200", message: "Deleted Restaurant" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

let showRestaurantByName = (name, callback) => {
  const query = { name: name };
  Restaurant.findOne(query, callback);
};

module.exports = {
  showAllRestaurant: showAllRestaurant,
  addRestaurant: addRestaurant,
  showRestaurantById: showRestaurantById,
  updateRestaurantById: updateRestaurantById,
  deleteRestaurantById: deleteRestaurantById,
  showRestaurantByIdV2: showRestaurantByIdV2,
};
