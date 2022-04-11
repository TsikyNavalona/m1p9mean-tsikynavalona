const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const OrderSchema = new mongoose.Schema({
  allFoodOrdered: [
    {
      oFood: { type: ObjectId, ref: "Food" },
      quantity: {type:String,required:true},
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
    default: null
  },
  oAmount: {
    type: Number,
    required: true,
  },
  oBenefit: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "not prepared",
    enum: ["not prepared", "prepared", "delivered", "Cancelled"],
  },
  orderAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = (module.exports = mongoose.model("Order", OrderSchema));
