const mongoose = require("mongoose");


const Adminchema = new mongoose.Schema({
  aUsername: {
    type: String,
    required: true,
  },
  aPassword: {
    type: String,
    required: true,
  },
  aEmail: {
    type: String,
    required: true,
  },
});
const Admin = (module.exports = mongoose.model("Admin", Adminchema));
