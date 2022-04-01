import express from "express";
import CustomerService from "../services/CustomerService";
import RestaurantService from "../services/RestaurantService";
import DelivererService from "../services/DelivererService";
import FoodService from "../services/FoodService";
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
router.get("/showAllFoodByRestaurant/:id", FoodService.showAllFoodByRestaurant);



return app.use("/", router);
};

module.exports = initWebRoutes;
