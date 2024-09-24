import express from "express";
import { config } from "dotenv";
import { MongoConnection } from "./database/mongo.connection";
import cvRouter from "./routers/cv.router";
import bodyParser from "body-parser";

const app = express();

config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/cv", cvRouter);

app.listen(process.env.PORT, () => {
  MongoConnection();
  console.log("Backend running on PORT:", process.env.PORT);
});
