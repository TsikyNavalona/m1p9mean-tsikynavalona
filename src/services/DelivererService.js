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
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    number: req.body.number,
    email: req.body.email,
  });
  try {
    deliverer.password = crypto
      .createHash("sha256")
      .update(deliverer.password)
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
  if (req.body.name != null) {
    deliverer.name = req.body.name;
  }
  if (req.body.username != null) {
    deliverer.username = req.body.username;
  }
  if (req.body.password != null) {
    deliverer.password = encrypt(req.body.password).content;
  }
  if (req.body.number != null) {
    deliverer.number = req.body.number;
  }
  if (req.body.email != null) {
    deliverer.email = req.body.email;
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

let showDelivererByUserName = (username, callback) => {
  const query = { username: username };
  Deliverer.findOne(query, callback);
};

let authenticate = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  showDelivererByUserName(username, (err, deliverer) => {
    if (err) throw err;
    if (!deliverer) {
      return res.json({ success: false, msg: "Deliverer not found" });
    }
    try {
      const hashPwd = crypto
        .createHash("sha256")
        .update("123456")
        .digest("base64");
      if (hashPwd === deliverer.password) {
        const token = jwt.sign({ data: deliverer }, "secretToken", {expiresIn: 604800});
        res.json({
          status: "200",
          success: true,
          token: "JWT " + token,
          customer: {
            id: deliverer._id,
            name: deliverer.name,
            username: deliverer.username,
            email: deliverer.email,
            number: deliverer.number,
            adress: deliverer.adress,
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
