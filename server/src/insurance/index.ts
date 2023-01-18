import express from "express";
import { nanoid } from "nanoid";
import { InsuranceApplication } from "./types/InsuranceApplication";
import { mockDataApplicants } from "./__tests__/mockData";

const router = express.Router();
const applications = mockDataApplicants;
const tempApplications: Partial<InsuranceApplication[]> = [];

router.get("/dashboard", (_req, res) => {
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
  const { body } = req;
  const { firstName, lastName } = body;

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
  res.send({ body, id });
  res.redirect("https://google.com");
});

router.get("/resume/:id", (req, res) => {});
router.post("/dummy-quote", (_req, res) => {
  res.send({ quote: 123 });
});

export default router;
