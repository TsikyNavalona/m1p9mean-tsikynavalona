import express from "express";
import UserController from "../controllers/UserController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/register",UserController.register);
  router.get("/login",UserController.login);
  return app.use("/",router);
};

module.exports = initWebRoutes;
