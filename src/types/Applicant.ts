import { Address } from "./Address";

export interface Applicant {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date; // at least 16 years old
  address?: Address;
  relationship?: "Spouse" | "Sibling" | "Parent" | "Friend" | "Other";
}
