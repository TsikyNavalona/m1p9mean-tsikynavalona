require("dotenv").config();
const { encrypt, decrypt } = require("../config/crypto");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const passport = require("passport");

import Deliverer from "../models/deliverer";

let showAllDeliverer = async (req, res) => {
  try {
    const deliverers = await Deliverer.find();
    res.json({ status: "200", datas: deliverers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let addDeliverer = async (req, res) => {
  const deliverer = new Deliverer({
    dName: req.body.dName,
    dUsername: req.body.dUsername,
    dPassword: req.body.dPassword,
    dNumber: req.body.dNumber,
    dEmail: req.body.dEmail,
  });
  try {
    deliverer.dPassword = crypto
      .createHash("sha256")
      .update(deliverer.dPassword)
      .digest("base64");
    const newDeliverer = await deliverer.save();
    res.status(201).json({ status: "200", datas: newDeliverer });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

let showDelivererById = async (req, res, next) => {
  let deliverer;
  try {
    deliverer = await Deliverer.findById(req.params.id);
    if (deliverer == null) {
      return res.status(404).json({ message: "Cannot find deliverer" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.json({ status: "200", datas: deliverer });
};

let showDelivererByIdV2 = function (id, callback) {
  Deliverer.findById(id, callback);
};

let updateDelivererById = async (req, res, next) => {
  let deliverer;
  try {
    deliverer = await Deliverer.findById(req.params.id);
    if (deliverer == null) {
      return res.status(404).json({ message: "Cannot find deliverer" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  if (req.body.dName != null) {
    deliverer.dName = req.body.dName;
  }
  if (req.body.dUsername != null) {
    deliverer.dUsername = req.body.dUsername;
  }
  if (req.body.dPassword != null) {
    deliverer.dPassword = encrypt(req.body.dPassword).content;
  }
  if (req.body.dNumber != null) {
    deliverer.dNumber = req.body.dNumber;
  }
  if (req.body.dEmail != null) {
    deliverer.dEmail = req.body.dEmail;
  }
  try {
    const updatedDeliverer = await deliverer.save();
    res.json({ status: "200", datas: updatedDeliverer });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

let deleteDelivererById = async (req, res, next) => {
  let deliverer;
  try {
    deliverer = await Deliverer.findById(req.params.id);
    if (deliverer == null) {
      return res.status(404).json({ message: "Cannot find deliverer" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  try {
    await deliverer.remove();
    res.json({ status: "200", message: "Deleted deliverer" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

let showDelivererByUserName = (dUsername, callback) => {
  const query = { dUsername: dUsername };
  Deliverer.findOne(query, callback);
};

let authenticate = (req, res, next) => {
  const username = req.body.dUsername;
  const password = req.body.dPassword;

  showDelivererByUserName(username, (err, deliverer) => {
    if (err) throw err;
    if (!deliverer) {
      return res.json({ success: false, msg: "Deliverer not found" });
    }
    try {
      const hashPwd = crypto
        .createHash("sha256")
        .update(password)
        .digest("base64");
      if (hashPwd === deliverer.dPassword) {
        const token = jwt.sign({ data: deliverer }, "secretToken", {expiresIn: 604800});
        res.json({
          status: "200",
          success: true,
          token: "JWT " + token,
          deliverer: {
            id: deliverer._id,
            dName: deliverer.dName,
            dUsername: deliverer.dUsername,
            dEmail: deliverer.dEmail,
            dNumber: deliverer.dNumber,
            dAdress: deliverer.dAdress,
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
  showAllDeliverer: showAllDeliverer,
  addDeliverer: addDeliverer,
  showDelivererById: showDelivererById,
  updateDelivererById: updateDelivererById,
  deleteDelivererById: deleteDelivererById,
  showDelivererByIdV2: showDelivererByIdV2,
  authenticate: authenticate,
};
