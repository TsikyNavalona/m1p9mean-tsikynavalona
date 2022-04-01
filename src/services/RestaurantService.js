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
    rName: req.body.rName,
    rDescription: req.body.rDescription,
    rPassword: req.body.rPassword,
    rNumber: req.body.rNumber,
    rEmail: req.body.rEmail,
    rAdress: req.body.rAdress,
    rLogo: req.body.rLogo,
  });
  try {
    restaurant.rPassword = crypto
      .createHash("sha256")
      .update(restaurant.rPassword)
      .digest("base64");
    const newRestaurant = await restaurant.save();
    res.status(201).json({ status: "200", datas: newRestaurant });
  } catch (err) {
    res.status(400).json({ message: err });
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
  if (req.body.rName != null) {
    restaurant.rName = req.body.rName;
  }
  if (req.body.rDescription != null) {
    restaurant.rDescription = req.body.rDescription;
  }
  if (req.body.rPassword != null) {
    restaurant.rPassword = encrypt(req.body.rPassword).content;
  }
  if (req.body.rNumber != null) {
    restaurant.rNumber = req.body.rNumber;
  }
  if (req.body.rEmail != null) {
    restaurant.rEmail = req.body.rEmail;
  }
  if (req.body.rAdress != null) {
    restaurant.rAdress = req.body.rAdress;
  }
  if (req.body.rLogo != null) {
    restaurant.rLogo = req.body.rLogo;
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

let showRestaurantByName = (rName, callback) => {
  const query = { rName: rName };
  Restaurant.findOne(query, callback);
};


let authenticate = (req, res, next) => {
  const name = req.body.rName;
  const password = req.body.rPassword;

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
      if (hashPwd === restaurant.rPassword) {
        const token = jwt.sign({ data: restaurant }, "secretToken", {expiresIn: 604800});
        res.json({
          status: "200",
          success: true,
          token: "JWT " + token,
          restaurant: {
            id: restaurant._id,
            rName: restaurant.rName,
            rDescription: restaurant.rDescription,
            rEmail: restaurant.rEmail,
            rNumber: restaurant.rNumber,
            rAdress: restaurant.rAdress,
            rLogo: restaurant.rLogo,
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
