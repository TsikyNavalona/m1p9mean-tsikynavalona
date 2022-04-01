const mongoose = require("mongoose");

const DelivererSchema = new mongoose.Schema({
  dName: {
    type: String,
    required: true,
  },
  dUsername: {
    type: String,
    required: true,
  },
  dPassword: {
    type: String,
    required: true,
  },
  dNumber: {
    type: String,
    required: true,
  },
  dEmail: {
    type: String,
    required: true,
  },
});
const Deliverer = (module.exports = mongoose.model("Deliverer", DelivererSchema));
