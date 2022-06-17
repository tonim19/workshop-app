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
        <h1 className="workshopsTitle">Workshops</h1>
        <p className="subtitle" data-testid="displayedText">
          Displayed: <strong>{displayedWorshops}</strong>
        </p>
        <WorkshopsList setDisplayedWorkshops={setDisplayedWorkshops} />
      </div>
    </div>
  );
}

export default Workshops;
