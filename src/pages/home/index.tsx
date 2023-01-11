import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { fullRouter } from "../../App";

const TITLE = "Home";

function ViewModeSwitch({
  onClick,
  isNight,
}: {
  onClick: () => void;
  isNight: boolean;
}) {
  return (
    <div className="form-check form-switch py-3">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id="viewModeSwitch"
        onClick={onClick}
      ></input>
      <label
        className={`form-check-label ${isNight && "text-light"}`}
        htmlFor="viewModeSwitch"
      >
        {isNight ? "Dark" : "Light"}
      </label>
    </div>
  );
}
export default function Home() {
  const [isNight, setIsNight] = useState<boolean>(true);
  return (
    <div
      className="min-vh-100"
      style={{ backgroundColor: isNight ? "rgb(11,17,35)" : "inherit" }}
    >
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <div className="container">
        <header className="d-flex justify-content-between">
          <h1 className={`pt-3 pb-2 ${isNight && "text-light"}`}>{TITLE}</h1>
          <ViewModeSwitch
            onClick={() => setIsNight(!isNight)}
            isNight={isNight}
          />
        </header>
        {fullRouter.map((item, idx) => (
          <div className="card mb-3 shadow mw-500" key={idx}>
            <div className="card-body">
              <div className="card-title">
                <Link to={item.path} className="text-capitalize">
                  {item.name}
                </Link>
              </div>
              {item.description && (
                <div className="card-text">{item.description}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
