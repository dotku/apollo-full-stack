import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
// import shoppingItems from "./shopping-items";
import insurance from "./insurance";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3030;

var app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://cdpn.io"],
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.log("app.use error");
    res.status(400).send("error parsing data");
  } else {
    next();
  }
});

//Require the Router we defined in shopping-items.js

//Use the Router on the sub route /shopping-items
// app.use("/shopping-items", shoppingItems);
app.use("/insurance", insurance);
app.use("/", (_req, res) => res.send("Hello World!"));

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
