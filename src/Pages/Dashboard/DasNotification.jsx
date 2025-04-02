import React, { useContext, useEffect, useState } from "react";
import { FaBell, FaTrash } from "react-icons/fa";
import API from "../../API's/AuthAPI";
import axios from "axios";
import UserContext from "../../Context/UserContext";

function DasNotification() {
  const { userdonner } = useContext(UserContext);
  const [InventS, setInventS] = useState([]);
  console.log(InventS);
  

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`${API}/inventory/get`);
        setInventS(response.data);
      } catch (error) {
        console.error("Failed to fetch inventory:", error);
      }
    };
    fetchInventory();
  }, []);

  // Function to delete a notification
  const deleteNotification = (id) => {
    setInventS((prevInventS) => prevInventS.filter((item) => item._id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-300 mt-10">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <FaBell className="text-yellow-500" /> Notifications
        </h2>
        <button className="text-blue-600 hover:underline">Mark all as read</button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {InventS?.filter((temp) => temp.user === userdonner._id).map((temp, index) => (
          <div key={index} className="relative p-4 border rounded-lg shadow-md bg-white">
            
            {/* Notification Content */}
            <div>
              <h2 className="font-semibold text-gray-800">
                Your {temp.userType} Approval Status:{" "}
                <span className={temp.approveStatus ? "text-green-600" : "text-red-600"}>
                  {temp.approveStatus ? "Approved" : "Not Approved Yet"}
                </span>
              </h2>
              <p className="text-gray-600 text-sm">
                Applied on: {new Date(temp.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Delete Button */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-700"
              onClick={() => deleteNotification(temp._id)}
            >
              <FaTrash className="text-lg" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DasNotification;
