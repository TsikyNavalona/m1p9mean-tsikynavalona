
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import mongoose from "mongoose";

import initWebRoutes from "./routes/web";


let app = express();

initWebRoutes(app);

app.use(cors());
let port =  2525;

app.listen(port, ()=>{
  console.log('Server started on port ' +port);
});
