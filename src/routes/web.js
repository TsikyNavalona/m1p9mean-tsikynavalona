import express from "express";
import CustomerService from "../services/CustomerService";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/register", CustomerService.register);
  router.get("/login", CustomerService.login);
  router.get("/showAllCustomer", CustomerService.showAllCustomer);
  router.post("/addCustomer", CustomerService.addCustomer);
  router.get("/showCustomerById/:id", CustomerService.showCustomerById);
  router.patch("/updateCustomerById/:id", CustomerService.updateCustomerById);
  router.delete("/deleteCustomerById/:id", CustomerService.deleteCustomerById);
  return app.use("/", router);
};

module.exports = initWebRoutes;
