import { createContext, Dispatch, useEffect, useState } from "react";
import {
  Routes,
  Route,
  Outlet,
  useAsyncError,
  useLoaderData,
} from "react-router-dom";
import { InsuranceApplication } from "../../types/InsuranceApplication";
import VehicleCreateForm from "./VehicleCreateForm";
export function InsurranceHome() {
  return (
    <div>
      <h2>Insurrance Home</h2>
      <form></form>
    </div>
  );
}

export const InsurranceContext = createContext<{
  insuranceApplication: Partial<InsuranceApplication> | undefined;
  setInsuranceApplication: Dispatch<
    React.SetStateAction<Partial<InsuranceApplication> | undefined>
  >;
}>({
  insuranceApplication: {},
  setInsuranceApplication: () => {},
});

export default function InsurranceIndex() {
  const [insuranceApplication, setInsuranceApplication] =
    useState<Partial<InsuranceApplication>>();

  return (
    <InsurranceContext.Provider
      value={{
        insuranceApplication,
        setInsuranceApplication,
      }}
    >
      <div className="container">
        <h1>Insurrance</h1>
        <Outlet />
      </div>
    </InsurranceContext.Provider>
  );
}
