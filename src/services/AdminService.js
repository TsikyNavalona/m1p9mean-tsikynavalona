require("dotenv").config();
const { encrypt, decrypt } = require("../config/crypto");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const passport = require("passport");

import Admin from "../models/admin";


let showAllAdmin = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json({ status: "200", datas: admins });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let addAdmin = async (req, res) => {
  const admin = new Admin({
    aUsername: req.body.aUsername,
    aPassword: req.body.aPassword,
    aEmail: req.body.aEmail,
  });
  try {
    admin.aPassword = crypto
      .createHash("sha256")
      .update(admin.aPassword)
      .digest("base64");
    const newAdmin = await admin.save();
    res.status(201).json({ status: "200", datas: newAdmin });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


let showAdminById = async (req, res, next) => {
  let admin;
  try {
    admin = await Admin.findById(req.params.id);
    if (admin == null) {
      return res.status(404).json({ message: "Cannot find admin" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.json({ status: "200", datas: admin });
};

let showAdminByIdV2 = function (id, callback) {
  Admin.findById(id, callback);
};


let showAdminByUserName = (aUsername, callback) => {
  const query = { aUsername: aUsername };
  Admin.findOne(query, callback);
};


let authenticate = (req, res, next) => {
  const username = req.body.aUsername;
  const password = req.body.aPassword;

  showAdminByUserName(username, (err, admin) => {
    if (err) throw err;
    if (!admin) {
      return res.json({ success: false, msg: "Admin not found" });
    }
    try {
      const hashPwd = crypto
        .createHash("sha256")
        .update(password)
        .digest("base64");
      if (hashPwd === admin.aPassword) {
        const token = jwt.sign({ data: admin }, "secretToken", {expiresIn: 604800});
        res.json({
          status: "200",
          success: true,
          token: "JWT " + token,
          admin: {
            id: admin._id,
            aUsername: admin.aUsername,
            aEmail: admin.aEmail,
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
  showAllAdmin: showAllAdmin,
  addAdmin: addAdmin,
  showAdminById: showAdminById,
  showAdminByIdV2: showAdminByIdV2,
  authenticate: authenticate,
};
