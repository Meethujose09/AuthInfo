import React, { useEffect, useState } from 'react';

const BuildingRoomForm = ({ floors, setBuildingData }) => {
  const [roomInputs, setRoomInputs] = useState([]);
  const [collapsedFloors, setCollapsedFloors] = useState({});

  useEffect(() => {
    setRoomInputs(Array.from({ length: floors }, (_, i) => ({ floor: i + 1, rooms: 1 })));
    setCollapsedFloors(
      Array.from({ length: floors }, (_, i) => ({ [i + 1]: false })).reduce((acc, cur) => ({ ...acc, ...cur }), {})
    );
  }, [floors]);

  const handleRoomChange = (floor, rooms) => {
    setRoomInputs(roomInputs.map(r => r.floor === floor ? { ...r, rooms } : r));
  };

  const toggleCollapse = (floor) => {
    setCollapsedFloors((prev) => ({ ...prev, [floor]: !prev[floor] }));
  };

  return (
    <div className="room-inputs">
      {roomInputs.map(({ floor, rooms }) => (
        <div key={floor} className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h4>Floor {floor}</h4>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => toggleCollapse(floor)}
            >
              {collapsedFloors[floor] ? 'Expand' : 'Collapse'}
            </button>
          </div>
          {!collapsedFloors[floor] && (
            <>
              <div className="form-group">
                <label>Number of rooms on floor {floor}:</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={rooms}
                  onChange={(e) => handleRoomChange(floor, parseInt(e.target.value))}
                />
              </div>
              {[...Array(rooms)].map((_, roomIndex) => (
                <div key={roomIndex} className="room-details mb-3">
                  <h5>Room {roomIndex + 1} on Floor {floor}</h5>
                  <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Room Area (sq ft)"
                  />
                  <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Number of Windows"
                  />
                  <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Number of Ventilators"
                  />
                </div>
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default BuildingRoomForm;
