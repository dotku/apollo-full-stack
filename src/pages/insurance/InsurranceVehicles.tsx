import { useContext, useState } from "react";
import { InsurranceContext } from ".";
import { Vehicle } from "../../types/Vehicle";
import VehicleCreateForm from "./VehicleCreateForm";

const REACT_APP_VEHICLE_LIMIT = process.env.REACT_APP_VEHICLE_LIMIT || 3;

export default function InsurranceVehicles({
  vehicles: defaultVehicles,
}: {
  vehicles?: Vehicle[];
}) {
  const {
    insuranceApplication: insurranceApplication,
    setInsuranceApplication: setInsurranceApplication,
  } = useContext(InsurranceContext);
  const [vehicles, setVehicles] = useState(defaultVehicles || []);

  const handleVheichleCreate = (vehicle: Vehicle) => {
    if (vehicles.length >= REACT_APP_VEHICLE_LIMIT) {
      alert("cannot have more than 3 total");
      return;
    }
    console.log("handleVheichleCreate");
    vehicles.push(vehicle);
    console.log(vehicles);
    setVehicles([...vehicles]);
    setInsurranceApplication &&
      setInsurranceApplication({
        ...insurranceApplication,
        vehicles,
      });
  };

  const handleVihicleDelete = (idx: number) => () => {
    console.log("idx", idx);
    vehicles[idx] && vehicles.splice(idx, 1);
    setVehicles([...vehicles]);
  };

  return (
    <fieldset>
      <legend className="h5 mt-3">Vehicles</legend>
      <VehicleCreateForm handleVehicleCreate={handleVheichleCreate} />
      {vehicles && vehicles.length ? (
        <div className="row">
          {vehicles.map((item: Vehicle, idx: number) => (
            <div className="col-sm-6" key={idx}>
              <div className="card m-2">
                <div className="card-body">
                  <div>VIN: {item.vin}</div>
                  <div>YEAR: {item.year}</div>
                  <div>MAKER: {item.maker}</div>
                  <div>MODEL: {item.model}</div>
                  <button
                    className="btn btn-outline-danger mt-2"
                    onClick={handleVihicleDelete(idx)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No Vehicle</div>
      )}
    </fieldset>
  );
}
