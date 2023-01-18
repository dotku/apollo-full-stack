import { nanoid } from "nanoid";
import { InsuranceApplication } from "../types/InsuranceApplication";

const mockDataApplicants: InsuranceApplication[] = [
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
  {
    id: nanoid(),
    primary: {
      firstName: "Jason",
      lastName: "Lynn",
      dateOfBirth: new Date("1995-12-17T11:24:00.000Z"),
      address: {
        street: "Street Name ABC123",
        city: "CityName SF",
        state: "CA",
        zipcode: 94123,
      },
    },
    vehicles: [
      {
        vin: nanoid(),
        year: 2022,
        maker: "Toyota",
        model: "Rav4",
      },
    ],
  },
];

export { mockDataApplicants };
