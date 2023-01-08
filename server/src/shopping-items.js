import express from "express";
import { nanoid } from "nanoid";

const router = express.Router();
const shoppingItems = [
  { id: nanoid(), content: "apple" },
  { id: nanoid(), content: "banna" },
  { id: nanoid(), content: "chiken" },
  { id: nanoid(), content: "duck" },
];

router.get("/", (_req, res) => {
  res.json(shoppingItems);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log("id", id);
  const result = shoppingItems.filter((item) => item.id === id);
  result.length
    ? res.json(shoppingItems.filter((item) => item.id === id))
    : res.status(404).send("Not found");
});

//Routes will go here
export default router;
