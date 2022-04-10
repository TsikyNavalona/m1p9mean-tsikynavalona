import express from "express";
import CustomerService from "../services/CustomerService";
import RestaurantService from "../services/RestaurantService";
import DelivererService from "../services/DelivererService";
import FoodService from "../services/FoodService";
import OrderService from "../services/OrderService";
import AdminService from "../services/AdminService";
const passport = require("passport");
const jwt = require("jsonwebtoken");

let router = express.Router();

let initWebRoutes = (app) => {
  // router.get("/register", CustomerService.register);
  // router.get("/login", CustomerService.login);
  router.get("/showAllCustomer", CustomerService.showAllCustomer);
  router.post("/addCustomer", CustomerService.addCustomer);
  router.get("/showCustomerById/:id", CustomerService.showCustomerById);
  router.patch("/updateCustomerById/:id", CustomerService.updateCustomerById);
  router.delete("/deleteCustomerById/:id", CustomerService.deleteCustomerById);
  router.post("/authenticateCustomer", CustomerService.authenticate);
  router.get("/checkProfile",passport.authenticate('jwt',{session:false}), CustomerService.checkProfile);
///////////////////////////////////////////////////////////////////////////////////////////////////////////
  router.get("/showAllRestaurant", RestaurantService.showAllRestaurant);
  router.post("/addRestaurant", RestaurantService.addRestaurant);
  router.get("/showRestaurantById/:id", RestaurantService.showRestaurantById);
  router.patch("/updateRestaurantById/:id", RestaurantService.updateRestaurantById);
  router.delete("/deleteRestaurantById/:id", RestaurantService.deleteRestaurantById);
  router.post("/authenticateRestaurant", RestaurantService.authenticate);
  //router.get("/checkProfile",passport.authenticate('jwt',{session:false}), RestaurantService.checkProfile);
///////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/showAllDeliverer", DelivererService.showAllDeliverer);
router.post("/addDeliverer", DelivererService.addDeliverer);
router.get("/showDelivererById/:id", DelivererService.showDelivererById);
router.patch("/updateDelivererById/:id", DelivererService.updateDelivererById);
router.delete("/deleteDelivererById/:id", DelivererService.deleteDelivererById);
router.post("/authenticateDeliverer", DelivererService.authenticate);
///////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/showAllFood", FoodService.showAllFood);
router.post("/addFood", FoodService.addFood);
router.get("/showFoodById/:id", FoodService.showFoodById);
router.get("/showAllFoodByRestaurant/:id", FoodService.showAllFoodByRestaurant);
router.get("/showFoodByListId/:id", FoodService.showFoodByListId);
///////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/showAllOrder", OrderService.showAllOrder);
router.get("/showAllOrderByCustomer/:id",passport.authenticate('jwt',{session:false}), OrderService.showAllOrderByCustomer);
router.get("/showAllOrderByRestaurant/:id",OrderService.showAllOrderByRestaurant);
router.get("/showAllOrderByRestaurantV2/:id/:status",OrderService.showAllOrderByRestaurantV2);
router.get("/showSumOrder", OrderService.showSumOrder);
router.post("/addOrder", OrderService.addOrder);
router.get("/showOrderById/:id", OrderService.showOrderById);
router.get("/showAllOrderByDeliverer/:id", OrderService.showAllOrderByDeliverer);
router.get("/showAllPreparedOrder", OrderService.showAllPreparedOrder);

router.delete("/deleteOrderById/:id", OrderService.deleteOrderById);
router.patch("/updateOrderById/:id", OrderService.updateOrderById);
///////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/showAllAdmin", AdminService.showAllAdmin);
router.post("/addAdmin", AdminService.addAdmin);
router.get("/showAdminById/:id", AdminService.showAdminById);
router.post("/authenticateAdmin", AdminService.authenticate);



return app.use("/", router);
};

module.exports = initWebRoutes;
