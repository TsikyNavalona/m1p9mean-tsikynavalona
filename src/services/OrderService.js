require("dotenv").config();

import Order from "../models/order";

let showAllOrder = async (req, res) => {
  try {
    const order = await Order.find({})
      .populate("allFoodOrdered.oFood", "_id fName fImage fPrice fBenefit")
      .populate("oRestaurant", "_id rName")
      .populate("oCustomer", "_id cUsername cNumber cEmail cAdress")
      .populate("oDeliverer", "_id dUsername dNumber dEmail")
      .sort({ _id: -1 });
    res.json({ status: "200", datas: order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let showAllOrderByCustomer = async (req, res) => {
  try {
    const order = await Order.find({ oCustomer: req.params.id })
      .populate("allFoodOrdered.id", "_id fName fImage fPrice fBenefit")
      .populate("oRestaurant", "_id rName")
      .populate("oCustomer", "_id cUsername cNumber cEmail cAdress")
      .populate("oDeliverer", "_id dUsername dNumber dEmail")
      .sort({ _id: -1 });
    res.json({ status: "200", datas: order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let addOrder = async (req, res) => {
  const order = new Order({
    allFoodOrdered: req.body.allFoodOrdered,
    oRestaurant: req.body.oRestaurant,
    oCustomer: req.body.oCustomer,
    oDeliverer: req.body.oDeliverer,
    oAmount: req.body.oAmount,
    status: req.body.status,
  });
  try {
    const newOrder = await order.save();
    res.status(201).json({ status: "200", datas: newOrder });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


let showOrderById = async (req, res, next) => {
  let order;
  try {
    order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: "Cannot find order" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.json({ status: "200", datas: order });
};

let deleteOrderById = async (req, res, next) => {
  let order;
  try {
    order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: "Cannot find order" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  try {
    await order.remove();
    res.json({ status: "200", message: "Deleted order" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


module.exports = {
  showAllOrder: showAllOrder,
  showAllOrderByCustomer: showAllOrderByCustomer,
  addOrder: addOrder,
  deleteOrderById: deleteOrderById,
  showOrderById: showOrderById
};
