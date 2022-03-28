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

let app = express();

app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization,Content-Length, X-Requested-With"
  );
  next();
});

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

require("./config/passport")(passport);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("invaild endpoint");
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// });

let port = 2525;

app.listen(port, () => {
  console.log("Server started on port " + port);
});
