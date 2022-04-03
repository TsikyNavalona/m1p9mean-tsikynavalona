const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const OrderSchema = new mongoose.Schema({
  allFoodOrdered: [
    {
      oFood: { type: ObjectId, ref: "Food" },
      quantitiy: Number,
    },
  ],

  oRestaurant: {
    type: ObjectId,
    ref: "Restaurant",
    required: true,
  },
  oCustomer: {
    type: ObjectId,
    ref: "Customer",
    required: true,
  },
  oDeliverer: {
    type: ObjectId,
    ref: "Deliverer",
    required: false,
  },
  oAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Not processed",
    enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"],
  },
  orderAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = (module.exports = mongoose.model("Order", OrderSchema));
