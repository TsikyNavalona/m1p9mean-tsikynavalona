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
app.use(session({ secret: 'secretToken' ,resave: true,
    saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
initWebRoutes(app);


mongoose.connect(config.database, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

require('./config/passport')(passport);
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

let port = 2525;

app.listen(port, () => {
  console.log("Server started on port " + port);
});
