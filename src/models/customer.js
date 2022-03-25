const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");

// Customer Schema
const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
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
});

const Customer = (module.exports = mongoose.model("Customer", CustomerSchema));
