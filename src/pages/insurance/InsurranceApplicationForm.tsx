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
import SimpleWarning from "../../components/SimpleWarning";
import { getStricDate, getYearDiff } from "../../utils";
import { property } from "lodash";

const REACT_APP_AGE_LIMIT = process.env.REACT_APP_AGE_LIMIT || 16;

export default function InsurranceApplicationForm() {
  const data = useLoaderData() as Partial<InsuranceApplication>;
  const { insuranceApplication, setInsuranceApplication } =
    useContext(InsurranceContext);
  const [error, setError] = useState("");
  const [ifLoading, setIfLoading] = useState(false);

  useEffect(() => {
    console.log("data", data);
    if (data?.primary) {
      setInsuranceApplication(data);
    }
  }, [data]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log("handleFormSubmit");
    e.preventDefault();
    // form validation
    // const { primary } = insuranceApplication as InsuranceApplication;
    // console.log("primary", primary);
    fetch("http://localhost:3030/insurance/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(insuranceApplication),
    })
      .then((rsp) => rsp.json())
      .then((rsp) => {
        alert(rsp.message);
      });
  };

  const handlePrimaryChange =
    (propertyName: string) => (e: FormEvent<HTMLInputElement>) => {
      if (propertyName === "dateOfBirth") {
        const date1 = new Date();
        const date2 = new Date(e.currentTarget.value);
        const errorMessage = "age limit";
        if (getYearDiff(date1, date2) <= REACT_APP_AGE_LIMIT)
          return setError(errorMessage);
        if (error === errorMessage) {
          setError("");
        }
      }

      const newInsuranceApplication = {
        ...insuranceApplication,
        primary: {
          ...insuranceApplication?.primary,
          [propertyName]:
            propertyName !== "dateOfBirth"
              ? e.currentTarget.value
              : getStricDate(e.currentTarget.value),
        },
      };
      console.log("newValue", newInsuranceApplication);
      setInsuranceApplication(newInsuranceApplication);
    };

  const handleAddressChange =
    (propertyName: string) => (e: FormEvent<HTMLInputElement>) => {
      const newValue = {
        ...insuranceApplication,
        primary: {
          ...insuranceApplication?.primary,
          address: {
            ...insuranceApplication?.primary?.address,
            [propertyName]: e.currentTarget.value,
          },
        },
      } as InsuranceApplication;
      console.log("newValue", newValue);
      setInsuranceApplication(newValue);
    };

  const handleInsurranceApplicantUpdate = () => {
    setIfLoading(true);
    fetch("http://localhost:3030/insurance", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(insuranceApplication),
    })
      .then((rsp) => rsp.json())
      .then((rsp) => {
        console.log(rsp);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setIfLoading(false);
      });
  };

  return (
    <div>
      <h2>Resume</h2>
      {error && <SimpleWarning message={error} onClose={() => setError("")} />}
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            required
            className="form-control"
            defaultValue={insuranceApplication?.primary?.firstName}
            onChange={handlePrimaryChange("firstName")}
            id="firstName"
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            required
            className="form-control"
            defaultValue={insuranceApplication?.primary?.lastName}
            id="lastName"
            onChange={handlePrimaryChange("lastName")}
          />
        </div>
        <div>
          <label htmlFor="date-of-birth">Date of Birth</label>
          <input
            required
            id="date-of-birth"
            className="form-control no-date-clear"
            value={
              new Date(insuranceApplication?.primary?.dateOfBirth || new Date())
                .toISOString()
                .split("T")[0]
            }
            max={new Date().getFullYear() - 16}
            type="date"
            onChange={handlePrimaryChange("dateOfBirth")}
          />
        </div>
        <fieldset>
          <legend className="h5 mt-3">Address</legend>
          <div>
            <label htmlFor="street">Street</label>
            <input
              required
              className="form-control"
              defaultValue={insuranceApplication?.primary?.address?.street}
              onChange={handleAddressChange("street")}
            />
          </div>
          <div>
            <label htmlFor="street">City</label>
            <input
              required
              className="form-control"
              defaultValue={insuranceApplication?.primary?.address?.city}
              onChange={handleAddressChange("city")}
            />
          </div>
          <div>
            <label htmlFor="street">State</label>
            <input
              required
              className="form-control"
              defaultValue={insuranceApplication?.primary?.address?.state}
              onChange={handleAddressChange("state")}
            />
          </div>
          <div>
            <label htmlFor="street">zipcode</label>
            <input
              required
              className="form-control"
              type="number"
              defaultValue={insuranceApplication?.primary?.address?.zipcode}
              onChange={handleAddressChange("zipcode")}
            />
          </div>
        </fieldset>
        <Vehicles vehicles={insuranceApplication?.vehicles || []} />
        <div className="text-center">
          <button
            type="button"
            className="btn btn-dark"
            onClick={handleInsurranceApplicantUpdate}
            disabled={ifLoading}
          >
            Save
          </button>
          <button type="submit" className="btn btn-dark m-3">
            Quote
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
