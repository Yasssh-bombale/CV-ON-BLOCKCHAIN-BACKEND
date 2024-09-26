import express from "express";
import { config } from "dotenv";
import { MongoConnection } from "./database/mongo.connection";
import cvRouter from "./routers/cv.router";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

config();

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: process.env.FRONT_END_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/cv", cvRouter);

app.listen(process.env.PORT, () => {
  MongoConnection();
  console.log("Backend running on PORT:", process.env.PORT);
});
