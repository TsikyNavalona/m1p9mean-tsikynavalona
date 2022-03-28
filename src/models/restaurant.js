const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
});

const Restaurant = (module.exports = mongoose.model("Restaurant", RestaurantSchema));
