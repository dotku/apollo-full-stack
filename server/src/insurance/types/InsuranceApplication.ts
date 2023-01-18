import { Applicant } from "./Applicant";
import { Vehicle } from "./Vehicle";

export interface InsuranceApplication {
  id: string;
  primary: Applicant;
  joins?: Applicant[];
  vehicles: Vehicle[];
}
