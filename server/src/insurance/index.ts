import express from "express";
import { nanoid } from "nanoid";
import { InsuranceApplication } from "./types/InsuranceApplication";
import { mockDataApplicants } from "./__tests__/mockData";

const router = express.Router();

const applications = mockDataApplicants;

// @todo: tempApplications id is required
const tempApplications: Partial<InsuranceApplication[]> = [];

router.get("/dashboard", async (_req, res) => {
  res.send({
    tempApplications,
    applications,
  });
});

router.get("/", (_req, res) => {
  res.send("insurrance sample");
});

router.post("/referal", (req, res) => {
  console.log("referal");
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).send({
      code: 400,
      message: "bad request, miss firstname or lastname",
    });
  }

  const id = nanoid();

  tempApplications.push({
    id,
    primary: {
      firstName,
      lastName,
    },
  });
  res.send({ id });
});

router.get("/resume", (_req, res) => {
  return res.status(404).send({
    code: 400,
    message: "bad request, resume id is requred",
  });
});

router.get("/resume/:id", (req, res) => {
  const { id } = req.params;

  const resumedItem = tempApplications.find((item) => item?.id === id);
  console.log("resumedItem", resumedItem, id);
  return resumedItem
    ? res.send(resumedItem)
    : res.status(404).send({
        code: 404,
        message: "item not found",
      });
});

router.post("/dummy-quote", (_req, res) => {
  res.send({ quote: 123 });
});

export default router;
