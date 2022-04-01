const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const FoodSchema = new mongoose.Schema({
  fRestaurant: {
    type: ObjectId,
    ref: "Restaurant",
    required: true,
  },
  fName: {
    type: String,
    required: true,
  },
  fDescription: {
    type: String,
    required: true,
  },
  fPrice: {
    type: Number,
    required: true,
  },
  fBenefit: {
    type: Number,
    required: true,
  },
  fImage: {
    type: String,
    required: true,
  },
});

const Food = (module.exports = mongoose.model("Food", FoodSchema));
