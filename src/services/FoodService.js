require("dotenv").config();

import Food from "../models/food";

let showAllFood = async (req, res) => {
  try {
    const foods = await Food.find({})
      .populate("fRestaurant", "_id rName")
      .sort({ _id: -1 });
    res.json({ status: "200", datas: foods });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let addFood = async (req, res) => {
  const food = new Food({
    fRestaurant: req.body.fRestaurant,
    fName: req.body.fName,
    fDescription: req.body.fDescription,
    fPrice: req.body.fPrice,
    fBenefit: req.body.fBenefit,
    fImage: req.body.fImage,
  });
  try {
    const newFood = await food.save();
    res.status(201).json({ status: "200", datas: newFood });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

let showAllFoodByRestaurant = async (req, res, next) => {
  let foods;
  try {
    foods = await Food.find({ fRestaurant: req.params.id })
      .populate("fRestaurant", "_id rName")
      .sort({ _id: -1 });
    if (foods == null) {
      return res
        .status(404)
        .json({ message: "Cannot find restaurant or no Food available" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.json({ status: "200", datas: foods });
};

let showFoodById = async (req, res, next) => {
  let food;
  try {
    food = await Food.findById(req.params.id).populate(
      "fRestaurant",
      "_id rName"
    );
    if (food == null) {
      return res.status(404).json({ message: "Cannot find Food" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.json({ status: "200", datas: food });
};

let showFoodByIdV2 = function (id, callback) {
  Food.findById(id, callback);
};

let updateFoodById = async (req, res, next) => {
  let food;
  try {
    food = await Food.findById(req.params.id);
    if (food == null) {
      return res.status(404).json({ message: "Cannot find food" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  if (req.body.fRestaurant != null) {
    food.fRestaurant = req.body.fRestaurant;
  }
  if (req.body.fName != null) {
    food.fName = req.body.fName;
  }
  if (req.body.fDescription != null) {
    food.fDescription = req.body.fDescription;
  }
  if (req.body.fPrice != null) {
    food.fPrice = req.body.fPrice;
  }
  if (req.body.fBenefit != null) {
    food.fBenefit = req.body.fBenefit;
  }
  if (req.body.fImage != null) {
    food.fImage = req.body.fImage;
  }
  try {
    const updatedFood = await food.save();
    res.json({ status: "200", datas: updatedFood });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

let deleteFoodById = async (req, res, next) => {
  let food;
  try {
    food = await Food.findById(req.params.id);
    if (food == null) {
      return res.status(404).json({ message: "Cannot find food" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  try {
    await food.remove();
    res.json({ status: "200", message: "Deleted food" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  showAllFood: showAllFood,
  addFood: addFood,
  showAllFoodByRestaurant: showAllFoodByRestaurant,
  showFoodById: showFoodById,
  showFoodByIdV2: showFoodByIdV2,
  updateFoodById: updateFoodById,
  deleteFoodById: deleteFoodById,
};
