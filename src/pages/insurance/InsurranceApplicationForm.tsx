import {
  FormEvent,
  FormEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLoaderData } from "react-router-dom";
import { InsurranceContext } from ".";
import { InsuranceApplication } from "../../types/InsuranceApplication";
import { Vehicle } from "../../types/Vehicle";
import Vehicles from "./InsurranceVehicles";

export default function InsurranceApplicationForm() {
  const data = useLoaderData() as Partial<InsuranceApplication>;
  const { insuranceApplication, setInsuranceApplication } =
    useContext(InsurranceContext);

  useEffect(() => {
    console.log("data", data);
    if (data?.primary) {
      setInsuranceApplication(data);
    }
  }, [data]);

  const handleVehicleCreateClick = ({ vin, year, model, maker }: Vehicle) => {
    setInsuranceApplication({
      ...insuranceApplication,
      vehicles: [
        ...(insuranceApplication?.vehicles || []),
        {
          vin,
          year,
          model,
          maker,
        },
      ],
    });
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>Resume</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            className="form-control"
            defaultValue={insuranceApplication?.primary?.firstName}
            id="firstName"
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            className="form-control"
            defaultValue={insuranceApplication?.primary?.lastName}
            id="lastName"
          />
        </div>
        <div>
          <label htmlFor="date-of-birth">Date of Birth</label>
          <input
            id="date-of-birth"
            className="form-control"
            defaultValue={new Date(
              insuranceApplication?.primary?.dateOfBirth || new Date()
            ).toISOString()}
            max={new Date().getFullYear() - 16}
            type="date"
          />
        </div>
        <fieldset>
          <legend className="h5 mt-3">Address</legend>
          <div>
            <label htmlFor="street">Street</label>
            <input
              className="form-control"
              defaultValue={insuranceApplication?.primary?.address?.street}
            />
          </div>
          <div>
            <label htmlFor="street">City</label>
            <input
              className="form-control"
              defaultValue={insuranceApplication?.primary?.address?.city}
            />
          </div>
          <div>
            <label htmlFor="street">State</label>
            <input
              className="form-control"
              defaultValue={insuranceApplication?.primary?.address?.state}
            />
          </div>
          <div>
            <label htmlFor="street">zipcode</label>
            <input
              className="form-control"
              defaultValue={insuranceApplication?.primary?.address?.zipcode}
            />
          </div>
        </fieldset>
        <Vehicles vehicles={insuranceApplication?.vehicles || []} />
        <div className="text-center">
          <button type="submit" className="btn btn-dark m-3">
            Submit
          </button>
        </div>
      </form>
      <div className="my-3 text-end">
        <small className="text-muted">
          signiture id: {insuranceApplication?.id}
        </small>
      </div>
    </div>
  );
}
