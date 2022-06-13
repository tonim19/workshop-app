import { useState } from "react";
import SelectCategory from "../../components/SelectCategory";
import WorkshopsList from "../../components/WorkshopsList";
import "./workshops.css";

function Workshops() {
  const [displayedWorshops, setDisplayedWorkshops] = useState(0);

  return (
    <div className="container">
      <SelectCategory />
      <div className="mainContent">
        <h2 className="workshopsTitle">Workshops</h2>
        <p className="displayedWorkshops">
          Displayed: <strong>{displayedWorshops}</strong>
        </p>
        <WorkshopsList setDisplayedWorkshops={setDisplayedWorkshops} />
      </div>
    </div>
  );
}

export default Workshops;
