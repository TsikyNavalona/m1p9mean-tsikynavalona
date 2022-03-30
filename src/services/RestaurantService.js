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


let authenticate = (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;

  showRestaurantByName(name, (err, restaurant) => {
    if (err) throw err;
    if (!restaurant) {
      return res.json({ success: false, msg: "Restaurant not found" });
    }
    try {
      const hashPwd = crypto
        .createHash("sha256")
        .update(password)
        .digest("base64");
      if (hashPwd === restaurant.password) {
        const token = jwt.sign({ data: restaurant }, "secretToken", {expiresIn: 604800});
        res.json({
          status: "200",
          success: true,
          token: "JWT " + token,
          restaurant: {
            id: restaurant._id,
            name: restaurant.name,
            description: restaurant.description,
            email: restaurant.email,
            number: restaurant.number,
            adress: restaurant.adress,
            logo: restaurant.logo,
          },
        });
      } else {
        return res.json({ success: false, msg: "Wrong password " });
      }
    } catch (e) {
      return res.json({ success: false, msg: "Wrong password " });
    }
  });
};
module.exports = {
  showAllRestaurant: showAllRestaurant,
  addRestaurant: addRestaurant,
  showRestaurantById: showRestaurantById,
  updateRestaurantById: updateRestaurantById,
  deleteRestaurantById: deleteRestaurantById,
  showRestaurantByIdV2: showRestaurantByIdV2,
  authenticate: authenticate
};
