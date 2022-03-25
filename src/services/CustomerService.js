require("dotenv").config();
const { encrypt, decrypt } = require("../config/crypto");

import Customer from "../models/customer";

let showAllCustomer = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let addCustomer = async (req, res) => {
  const customer = new Customer({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    number: req.body.number,
    email: req.body.email,
    adress: req.body.adress,
  });
  try {
    customer.password = encrypt(customer.password).content;
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

let showCustomerById = async (req, res, next) => {
  let customer;
  try {
    customer = await Customer.findById(req.params.id);
    if (customer == null) {
      return res.status(404).json({ message: "Cannot find customer" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.json(customer);
};

let updateCustomerById = async (req, res, next) => {
  let customer;
  try {
    customer = await Customer.findById(req.params.id);
    if (customer == null) {
      return res.status(404).json({ message: "Cannot find customer" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  if (req.body.name != null) {
    customer.name = req.body.name;
  }
  if (req.body.username != null) {
    customer.username = req.body.username;
  }
  if (req.body.password != null) {
    customer.password = encrypt(req.body.password).content;
  }
  if (req.body.number != null) {
    customer.number = req.body.number;
  }
  if (req.body.email != null) {
    customer.email = req.body.email;
  }
  if (req.body.adress != null) {
    customer.adress = req.body.adress;
  }
  try {
    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

let deleteCustomerById = async (req, res, next) => {
  let customer;
  try {
    customer = await Customer.findById(req.params.id);
    if (customer == null) {
      return res.status(404).json({ message: "Cannot find customer" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  try {
    await customer.remove();
    res.json({ message: "Deleted Customer" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

let register = (req, res, next) => {
  return res.send("Register");
};

let login = (req, res, next) => {
  return res.send("login");
};

module.exports = {
  register: register,
  login: login,
  showAllCustomer: showAllCustomer,
  addCustomer: addCustomer,
  showCustomerById: showCustomerById,
  updateCustomerById: updateCustomerById,
  deleteCustomerById: deleteCustomerById,
};
