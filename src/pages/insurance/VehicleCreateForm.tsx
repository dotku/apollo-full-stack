import { FormEvent, MouseEventHandler, useContext, useState } from "react";
import { Vehicle } from "../../types/Vehicle";
import { nanoid } from "nanoid";
import { InsurranceContext } from ".";

const REACT_APP_VEHICLE_LIMIT = process.env.REACT_APP_VEHICLE_LIMIT || 3;

export default function VehicleCreateForm({
  handleVehicleCreate,
}: {
  handleVehicleCreate?: (vehicle: Vehicle) => void;
}) {
  const { insuranceApplication: insurranceApplication } =
    useContext(InsurranceContext);

  const defaultVehicle = {
    vin: nanoid(),
    year: new Date().getFullYear(),
    maker: "ford",
    model: "escape",
  };
  const emptyVehicle = {
    vin: "",
    year: 1985,
    maker: "",
    model: "",
  };
  const [vehicle, setVehicle] = useState(defaultVehicle);
  const [error, setError] = useState("");

  const handleCreateVehicleClick = () => {
    console.log("insurranceApplication", insurranceApplication);
    if (
      insurranceApplication &&
      insurranceApplication.vehicles &&
      insurranceApplication.vehicles.length >= REACT_APP_VEHICLE_LIMIT
    ) {
      return setError(`Vehicles number limit is ${REACT_APP_VEHICLE_LIMIT}`);
    }
    // @todo should highlight/focus the error input
    if (!vehicle.vin) return setError("vin is required");
    if (!vehicle.maker) return setError("maker is required");
    if (!vehicle.model) return setError("model is required");
    handleVehicleCreate && handleVehicleCreate(vehicle);
    setVehicle(emptyVehicle);
    setError("");
  };

  return (
    <div>
      <div>
        <label htmlFor="vin">vin</label>
        <input
          className="form-control"
          value={vehicle.vin}
          id="vin"
          onChange={(e) =>
            setVehicle({
              ...vehicle,
              vin: e.target.value,
            })
          }
        />
      </div>
      <div>
        <label htmlFor="year">year</label>
        <input
          className="form-control"
          value={vehicle.year}
          id="year"
          min="1985"
          max={new Date().getFullYear() + 1}
          type="number"
          onChange={(e) =>
            setVehicle({
              ...vehicle,
              year: parseInt(e.target.value),
            })
          }
        />
      </div>
      <div>
        <label htmlFor="maker">maker</label>
        <input
          className="form-control"
          value={vehicle.maker}
          id="maker"
          onChange={(e) =>
            setVehicle({
              ...vehicle,
              maker: e.target.value,
            })
          }
        />
      </div>
      <div>
        <label htmlFor="model">model</label>
        <input
          className="form-control"
          value={vehicle.model}
          id="model"
          onChange={(e) =>
            setVehicle({
              ...vehicle,
              model: e.target.value,
            })
          }
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="btn btn-outline-dark my-3"
          onClick={handleCreateVehicleClick}
        >
          Create Vehicle
        </button>
      </div>
      {error && (
        <div className="alert alert-warning alert-dismissible fade show">
          {error}
          <button
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              padding: "0.94rem 1.25rem",
              color: "inherit",
            }}
            type="button"
            className="btn close float-end"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => setError("")}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </div>
  );
}
