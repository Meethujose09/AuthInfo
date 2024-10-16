import React, { useState } from 'react';
import BuildingRoomForm from './BuildingRoomForm';

const BuildingInfo = ({ user }) => {
  const [floors, setFloors] = useState(1);
  const [buildingData, setBuildingData] = useState([]);
  const [buildingResult, setBuildingResult] = useState('');

  const handleSubmitBuildingInfo = () => {
    setBuildingResult("Building information submitted successfully.");
  };

  const handleSaveToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + buildingData.map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `${user.email.replace(/[^a-zA-Z0-9]/g, "_")}_building_info.csv`);
    document.body.appendChild(link); 
    link.click();
    document.body.removeChild(link);
    setBuildingResult("Building information saved successfully.");
  };

  return (
    <div className="building-info">
      <div className="form-group">
        <label>Enter the number of floors:</label>
        <input type="number" className="form-control" min="1" value={floors} onChange={(e) => setFloors(parseInt(e.target.value))} />
      </div>
      <BuildingRoomForm floors={floors} setBuildingData={setBuildingData} />
      <button className="btn btn-info btn-block mt-3" onClick={handleSubmitBuildingInfo}>Submit Building Info</button>
      <button className="btn btn-success btn-block mt-3" onClick={handleSaveToCSV}>Save to CSV</button>
      <div className="mt-3">{buildingResult}</div>
    </div>
  );
};

export default BuildingInfo;
