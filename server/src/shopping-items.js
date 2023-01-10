import express from "express";
import { nanoid } from "nanoid";

const router = express.Router();
let shoppingItems = [
  { id: nanoid(), content: "apple" },
  { id: nanoid(), content: "banna" },
  { id: nanoid(), content: "chiken" },
  { id: nanoid(), content: "duck" },
];

router.get("/", (req, res) => {
  const { q } = req.query;

  setTimeout(() => {
    res.json(
      q
        ? shoppingItems.filter((item) => item.content.includes(q))
        : shoppingItems
    );
  }, 1000);
});

router.get("/:keywords", (req, res) => {
  const { keywords } = req.params;
  const result = shoppingItems.filter((item) =>
    item.content.toLowerCase().includes(keywords.toLowerCase())
  );
  result.length ? res.json(result) : res.status(404).send([]);
});

router.delete("/:id", (req, res) => {
  shoppingItems = shoppingItems.filter((item) => item.id !== req.params.id);
  res.json(shoppingItems);
});

router.post("/", (req, res) => {
  shoppingItems.push({
    id: nanoid(),
    content: req?.body?.content,
  });
  res.json({
    data: shoppingItems,
  });
});

export default router;
