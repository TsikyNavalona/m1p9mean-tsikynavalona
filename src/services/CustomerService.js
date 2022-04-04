require("dotenv").config();
const { encrypt, decrypt } = require("../config/crypto");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const passport = require("passport");

import Customer from "../models/customer";

let showAllCustomer = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json({ status: "200", datas: customers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let addCustomer = async (req, res) => {
  const customer = new Customer({
    cName: req.body.cName,
    cUsername: req.body.cUsername,
    cPassword: req.body.cPassword,
    cNumber: req.body.cNumber,
    cEmail: req.body.cEmail,
    cAdress: req.body.cAdress,
  });
  try {
    customer.cPassword = crypto
      .createHash("sha256")
      .update(customer.cPassword)
      .digest("base64");
    const newCustomer = await customer.save();
    res.json({ status: "200", datas: newCustomer });
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
  res.json({ status: "200", datas: customer });
};

let showCustomerByIdV2 = function (id, callback) {
  Customer.findById(id, callback);
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
  if (req.body.cName != null) {
    customer.cName = req.body.cName;
  }
  if (req.body.cUsername != null) {
    customer.cUsername = req.body.cUsername;
  }
  if (req.body.cPassword != null) {
    customer.cPassword = encrypt(req.body.cPassword).content;
  }
  if (req.body.cNumber != null) {
    customer.cNumber = req.body.cNumber;
  }
  if (req.body.cEmail != null) {
    customer.cEmail = req.body.cEmail;
  }
  if (req.body.cAdress != null) {
    customer.cAdress = req.body.cAdress;
  }
  try {
    const updatedCustomer = await customer.save();
    res.json({ status: "200", datas: updatedCustomer });
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
    res.json({ status: "200", message: "Deleted Customer" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

let showCustomerByUserName = (cUsername, callback) => {
  const query = { cUsername: cUsername };
  Customer.findOne(query, callback);
};

let authenticate = (req, res, next) => {
  const username = req.body.cUsername;
  const password = req.body.cPassword;

  showCustomerByUserName(username, (err, customer) => {
    if (err) throw err;
    if (!customer) {
      return res.json({ success: false, msg: "Customer not found" });
    }
    try {
      const hashPwd = crypto
        .createHash("sha256")
        .update(password)
        .digest("base64");
      if (hashPwd === customer.cPassword) {
        const token = jwt.sign({ data: customer }, "secretToken", {expiresIn: 604800});
        res.json({
          status: "200",
          success: true,
          token: "JWT " + token,
          customer: {
            id: customer._id,
            cName: customer.cName,
            cUsername: customer.cUsername,
            cEmail: customer.cEmail,
            cNumber: customer.cNumber,
            cAdress: customer.cAdress,
          },
        });
      } else {
        return res.json({ success: false, msg: "Wrong password " });
      }
    } catch (e) {
      return res.json({ success: false, msg: "Wrong password or " + e });
    }
  });
};

let checkProfile = (req, res, next) => {
  return res.json({ status: "200", customer: req.user });
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
  authenticate: authenticate,
  checkProfile: checkProfile,
  showCustomerByIdV2: showCustomerByIdV2,
};
