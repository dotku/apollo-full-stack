// @todo might need a primary driver information?

export interface Vehicle {
  vin: string;
  year: number; // validate numeric and valid year between 1985 and current year + 1
  maker: string;
  model: string;
}
