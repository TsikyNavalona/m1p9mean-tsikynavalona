const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  rName: {
    type: String,
    required: true,
  },
  rDescription: {
    type: String,
    required: true,
  },
  rPassword: {
    type: String,
    required: true,
  },
  rNumber: {
    type: String,
    required: true,
  },
  rEmail: {
    type: String,
    required: true,
  },
  rAdress: {
    type: String,
    required: true,
  },
  rLogo: {
    type: String,
    required: true,
  },
});

const Restaurant = (module.exports = mongoose.model("Restaurant", RestaurantSchema));
