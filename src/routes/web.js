import express from "express";
import CustomerService from "../services/CustomerService";
const passport = require("passport");
const jwt = require("jsonwebtoken");

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/register", CustomerService.register);
  router.get("/login", CustomerService.login);
  router.get("/showAllCustomer", CustomerService.showAllCustomer);
  router.post("/addCustomer", CustomerService.addCustomer);
  router.get("/showCustomerById/:id", CustomerService.showCustomerById);
  router.patch("/updateCustomerById/:id", CustomerService.updateCustomerById);
  router.delete("/deleteCustomerById/:id", CustomerService.deleteCustomerById);
  router.post("/authenticate", CustomerService.authenticate);
  router.get("/checkProfile",passport.authenticate('jwt',{session:false}), CustomerService.checkProfile);

  return app.use("/", router);
};

module.exports = initWebRoutes;
