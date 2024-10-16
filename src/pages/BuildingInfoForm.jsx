import React, { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

const BuildingInfoForm = ({ userEmail }) => {
  const [numFloors, setNumFloors] = useState(1);
  const [floors, setFloors] = useState([{ rooms: [{ area: '', windows: '', ventilators: '', temperature: '', time: '' }] }] );
  const [openIndex, setOpenIndex] = useState(0); 

  const handleFloorChange = (e) => {
    const floorCount = parseInt(e.target.value);
    setNumFloors(floorCount);
    const newFloors = Array.from({ length: floorCount }, (_, i) => ({
      rooms: [{ area: '', windows: '', ventilators: '', temperature: '', time: '' }]
    }));
    setFloors(newFloors);
  };

  const handleRoomChange = (floorIndex, roomIndex, field, value) => {
    const updatedFloors = [...floors];
    updatedFloors[floorIndex].rooms[roomIndex][field] = value;
    setFloors(updatedFloors);
  };

  const addRoom = (floorIndex) => {
    const updatedFloors = [...floors];
    updatedFloors[floorIndex].rooms.push({ area: '', windows: '', ventilators: '', temperature: '', time: '' });
    setFloors(updatedFloors);
  };

  const removeRoom = (floorIndex, roomIndex) => {
    const updatedFloors = [...floors];
    updatedFloors[floorIndex].rooms.splice(roomIndex, 1);
    setFloors(updatedFloors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(floors);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome, {userEmail}</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="numFloors" className="block text-sm font-semibold mb-2">Enter the number of floors:</label>
          <input
            type="number"
            id="numFloors"
            value={numFloors}
            onChange={handleFloorChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
            min="1"
          />
        </div>

        {Array.from({ length: numFloors }, (_, floorIndex) => (
          <div key={floorIndex} className="mb-4">
            <div
              onClick={() => setOpenIndex(openIndex === floorIndex ? -1 : floorIndex)}
              className="cursor-pointer bg-gray-200 p-4 rounded-lg mb-2"
            >
              <h3 className="text-lg font-semibold">Floor {floorIndex + 1} {openIndex === floorIndex ? '-' : '+'}</h3>
            </div>
            {openIndex === floorIndex && (
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">Number of rooms:</label>
                  <button
                    type="button"
                    onClick={() => addRoom(floorIndex)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-2"
                  >
                    Add Room
                  </button>
                  {floors[floorIndex]?.rooms.length > 0 && (
                    <ul className="mb-4">
                      {floors[floorIndex].rooms.map((room, roomIndex) => (
                        <li key={roomIndex} className="mb-4 p-4 border border-gray-200 rounded-lg">
                          <h4 className="text-md font-semibold">Room {roomIndex + 1}</h4>
                          <div className="mb-2">
                            <label className="block text-sm font-semibold">Room Area (sq ft):</label>
                            <input
                              type="number"
                              value={room.area}
                              onChange={(e) => handleRoomChange(floorIndex, roomIndex, 'area', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
                            />
                          </div>
                          <div className="mb-2">
                            <label className="block text-sm font-semibold">Number of Windows:</label>
                            <input
                              type="number"
                              value={room.windows}
                              onChange={(e) => handleRoomChange(floorIndex, roomIndex, 'windows', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
                            />
                          </div>
                          <div className="mb-2">
                            <label className="block text-sm font-semibold">Number of Ventilators:</label>
                            <input
                              type="number"
                              value={room.ventilators}
                              onChange={(e) => handleRoomChange(floorIndex, roomIndex, 'ventilators', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
                            />
                          </div>
                          <div className="mb-2">
                            <label className="block text-sm font-semibold">Set Temperature:</label>
                            <input
                              type="number"
                              value={room.temperature}
                              onChange={(e) => handleRoomChange(floorIndex, roomIndex, 'temperature', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
                            />
                          </div>
                          <div className="mb-2">
                            <label className="block text-sm font-semibold">Time of Use:</label>
                            <input
                              type="text"
                              value={room.time}
                              onChange={(e) => handleRoomChange(floorIndex, roomIndex, 'time', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeRoom(floorIndex, roomIndex)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove Room
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg">Submit</button>
      </form>
    </div>
  );
};

export default BuildingInfoForm;
