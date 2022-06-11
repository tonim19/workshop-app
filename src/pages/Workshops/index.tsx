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
        <h6 className="displayedWorkshops">
          Displayed: <strong>{displayedWorshops}</strong>
        </h6>
        <WorkshopsList setDisplayedWorkshops={setDisplayedWorkshops} />
      </div>
    </div>
  );
}

export default Workshops;
