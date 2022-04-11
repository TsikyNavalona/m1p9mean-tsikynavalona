import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";

const config = require("./config/database");
import initWebRoutes from "./routes/web";
import Customer from "./models/customer";
import Order from "./models/order";

let app = express();

app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
//#1abc9c  #083863
app.use(
  session({ secret: "secretToken", resave: true, saveUninitialized: true })
);
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
initWebRoutes(app);

mongoose.connect(config.database, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));
//Order.collection.drop();
require("./config/passport")(passport);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("invaild endpoint");
});

app.use(express.static(path.join(__dirname, "public")));
app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

let port = process.env.PORT || 2525;

app.listen(port, () => {
  console.log("Server started on port " + port);
});
