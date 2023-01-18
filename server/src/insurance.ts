import express from "express";
import { nanoid } from "nanoid";

const router = express.Router();

interface Address {
  street: string;
  city: string;
  state: string;
  zipcode: number;
}
// @todo might need a primary driver information?
interface Vehicle {
  vin: string;
  year: number; // validate numeric and valid year between 1985 and current year + 1
  maker: string;
  model: string;
}

interface Applicant {
  firstName: string;
  lastName: string;
  dateOfBirth: Date; // at least 16 years old
  address: Address;
  relationship?: "Spouse" | "Sibling" | "Parent" | "Friend" | "Other";
}

interface InsuranceApplication {
  id: string;
  primary: Applicant;
  joins?: Applicant[];
  vehicles: Vehicle[];
}

const mockApplicants: InsuranceApplication[] = [
  {
    id: nanoid(),
    primary: {
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: new Date("December 17, 1995 03:24:00"),
      address: {
        street: "Street Name ABC123",
        city: "CityName SF",
        state: "CA",
        zipcode: 94123,
      },
    },
    vehicles: [
      {
        vin: `vin${nanoid()}`,
        year:
          1985 +
          Math.floor((new Date().getFullYear() + 1 - 1985) * Math.random()),
        maker: "Toyota",
        model: "Rav4",
      },
    ],
  },
];

router.get("/dashboard", (_req, res) => {
  res.send(mockApplicants);
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
