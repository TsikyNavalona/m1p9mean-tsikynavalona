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

let showAllOrderByDeliverer = async (req, res) => {
  try {
    const order = await Order.find({ oDeliverer: req.params.id })
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

let showAllOrderByRestaurant = async (req, res) => {
  try {
    const order = await Order.find({ oRestaurant: req.params.id })
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

let showAllOrderByRestaurantV2 = async (req, res) => {
  try {
    const typeStatus = req.params.status;
    if(typeStatus==1){ /// not prepared
      const order = await Order.find({ oRestaurant: req.params.id , status: "not prepared"})
      .populate("allFoodOrdered.oFood", "_id fName fImage fPrice fBenefit")
      .populate("oRestaurant", "_id rName")
      .populate("oCustomer", "_id cUsername cNumber cEmail cAdress")
      .populate("oDeliverer", "_id dUsername dNumber dEmail")
      .sort({ _id: -1 });
      res.json({ status: "200", datas: order });
    }
    // if(typeStatus==3){ /// not prepared
    //   const order = await Order.find({ oRestaurant: req.params.id , status: "prepared"})
    //   .populate("allFoodOrdered.oFood", "_id fName fImage fPrice fBenefit")
    //   .populate("oRestaurant", "_id rName")
    //   .populate("oCustomer", "_id cUsername cNumber cEmail cAdress")
    //   .populate("oDeliverer", "_id dUsername dNumber dEmail")
    //   .sort({ _id: -1 });
    //   res.json({ status: "200", datas: order });
    // }
    else{
      const order = await Order.find({ oRestaurant: req.params.id , status: { $ne: "not prepared" } })
      .populate("allFoodOrdered.oFood", "_id fName fImage fPrice fBenefit")
      .populate("oRestaurant", "_id rName")
      .populate("oCustomer", "_id cUsername cNumber cEmail cAdress")
      .populate("oDeliverer", "_id dUsername dNumber dEmail")
      .sort({ _id: -1 });
      res.json({ status: "200", datas: order });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let showAllPreparedOrder= async(req, res) => {
  try {
    const order = await Order.find({status: "prepared"})
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


let showSumOrder = async (req, res) => {
  try {
    const order = await Order.aggregate([
      { $group: { _id: null, fPrice: { $sum: "$allFoodOrdered.oFood.fPrice" } } },
    ]);
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
    oBenefit: req.body.oBenefit,
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
    order = await Order.findById(req.params.id)
    .populate("allFoodOrdered.oFood", "_id fName fPrice fBenefit")
    .populate("oRestaurant", "_id rName")
    .populate("oCustomer", "_id cUsername cNumber cEmail cAdress")
    .populate("oDeliverer", "_id dUsername dNumber dEmail")
    .sort({ _id: -1 });
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
let updateOrderById = async (req, res, next) =>{
  let order;
  try {
    order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: "Cannot find order" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  if(req.body.status !=null){
    order.status = req.body.status;
  }
  if(req.body.oDeliverer !=null){
    order.oDeliverer = req.body.oDeliverer;
  }
  try {
    const updatedOrder = await order.save();
    res.json({ status: "200", datas: updatedOrder });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

//let showAllOrderByCustomer
module.exports = {
  showAllOrder: showAllOrder,
  showAllOrderByCustomer: showAllOrderByCustomer,
  addOrder: addOrder,
  deleteOrderById: deleteOrderById,
  showOrderById: showOrderById,
  showSumOrder: showSumOrder,
  showAllOrderByRestaurant: showAllOrderByRestaurant,
  showAllOrderByDeliverer: showAllOrderByDeliverer,
  showAllOrderByRestaurantV2: showAllOrderByRestaurantV2,
  showAllPreparedOrder:showAllPreparedOrder,
  updateOrderById:updateOrderById
};
