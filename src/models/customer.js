const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");

// Customer Schema
const CustomerSchema = new mongoose.Schema({
  cName: {
    type: String,
    required: true,
  },
  cUsername: {
    type: String,
    required: true,
  },
  cPassword: {
    type: String,
    required: true,
  },
  cNumber: {
    type: String,
    required: true,
  },
  cEmail: {
    type: String,
    required: true,
  },
  cAdress: {
    type: String,
    required: true,
  },
});

const Customer = (module.exports = mongoose.model("Customer", CustomerSchema));
