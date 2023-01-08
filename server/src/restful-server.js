import express from "express";
import bodyParser from "body-parser";
import shoppingItems from "./shopping-items.js";

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Require the Router we defined in shopping-items.js

//Use the Router on the sub route /shopping-items
app.use("/shopping-items", shoppingItems);

app.listen(3030);
