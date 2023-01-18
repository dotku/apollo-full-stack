import express from "express";
import { mockDataApplicants } from "./__tests__/mockData";

const router = express.Router();

router.get("/dashboard", (_req, res) => {
  res.send(mockDataApplicants);
});

router.get("/", (_req, res) => {
  res.send("insurrance sample");
});

router.post("/referal", (req, res) => {});

router.get("/resume/:id", (req, res) => {});
router.post("/dummy-quote", (_req, res) => {
  res.send({ quote: 123 });
});

export default router;
