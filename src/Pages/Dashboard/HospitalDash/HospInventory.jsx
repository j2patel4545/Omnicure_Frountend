import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSearch, FaCheckCircle, FaTimesCircle, FaUser, FaEnvelope, FaPhone, FaTint, FaHospital, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../../API's/AuthAPI";
import { HospitalContext } from "../../../Context/HospitalContextProvider";

function HospInventory() {
  const { hospitaluser } = useContext(HospitalContext);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`${API}/inventory/get`);
        setInventory(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch inventory:", error);
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  const filteredInventory = inventory.filter(
    (item) =>
      item.hospital === hospitaluser.hospitalName &&
      (searchQuery === "" || item.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleApproval = async (id, currentStatus) => {
    const approveStatus = !currentStatus;
    try {
      await axios.put(`${API}/inventory/approve/${id}`, { approveStatus });
      setInventory((prevInventory) =>
        prevInventory.map((item) =>
          item._id === id ? { ...item, approveStatus: approveStatus } : item
        )
      );
      toast.success(`Request ${approveStatus ? "Approved" : "Cancelled"} Successfully!`);
    } catch (error) {
      console.error("Error updating approval status:", error);
      toast.error("Failed to update request. Try again!");
    }
  };
  const toggleApproval2 = async (id, currentStatus) => {
    const isdonneted = !currentStatus;
    try {
      await axios.put(`${API}/inventory/isdonnete/${id}`, { isdonneted });
      setInventory((prevInventory) =>
        prevInventory.map((item) =>
          item._id === id ? { ...item, isdonneted: isdonneted } : item
        )
      );
      toast.success(`Request ${isdonneted ? "Approved" : "Cancelled"} Successfully!`);
    } catch (error) {
      console.error("Error updating approval status:", error);
      toast.error("Failed to update request. Try again!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-900 text-center mb-6">Hospital Inventory</h2>
      
      {/* Search Section */}
      <div className="mb-6 flex items-center border rounded-lg p-3 shadow-md">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search by Email ID"
          className="w-full p-2 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center text-gray-500 text-lg">Loading inventory...</div>
      ) : filteredInventory.length > 0 ? (
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredInventory.map((item) => (
            <motion.div
              key={item._id}
              className="p-6 bg-white border border-gray-300 rounded-xl shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <FaUser className="text-4xl text-gray-700" />
                <h4 className="font-semibold text-xl text-gray-900">{item.name}</h4>
              </div>
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <p className="flex items-center"><FaTint className="mr-2 text-red-500" /> <strong>Blood Type:</strong> {item.bloodType}</p>
                <p className="flex items-center"><FaHospital className="mr-2 text-blue-500" /> <strong>Hospital:</strong> {item.hospital || "N/A"}</p>
                <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-green-600" /> <strong>Address:</strong> {item.address || "N/A"}</p>
                <p className="flex items-center"><FaPhone className="mr-2 text-purple-500" /> <strong>Mobile:</strong> {item.moNo}</p>
                <p className="flex items-center"><FaEnvelope className="mr-2 text-yellow-600" /> <strong>Email:</strong> {item.email}</p>
                <p className="flex items-center"><FaCalendarAlt className="mr-2 text-gray-500" /> <strong>Created:</strong> {item.createdAt.split("T")[0]}</p>
                <p className="flex items-center"><FaUser className="mr-2 text-gray-700" /> <strong>Age:</strong> {item.age ?? "N/A"}</p>
                <p className="flex items-center"><FaCalendarAlt className="mr-2 text-blue-500" /> <strong>Donation Date:</strong> {item.donationDate ? item.donationDate.split("T")[0] : "N/A"}</p>
                <p className="flex items-center"><FaUser className="mr-2 text-gray-700" /> <strong>User Type:</strong> {item.userType}</p>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <span className={`text-sm font-semibold px-3 py-1 rounded-md ${item.approveStatus ? "bg-green-100 text-green-700 border border-green-400" : "bg-red-100 text-red-700 border border-red-400"}`}>
                  {item.approveStatus ? "Approved" : "Not Approved"}
                </span>
                <button
                  onClick={() => toggleApproval(item._id, item.approveStatus)}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${item.approveStatus ? "bg-red-600 text-white hover:bg-red-700" : "bg-green-600 text-white hover:bg-green-700"}`}
                >
                  {item.approveStatus ? "Cancel Request" : "Approve Request"}
                </button>

                <button
                  onClick={() => toggleApproval2(item._id, item.isdonneted)}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${item.isdonneted ? "bg-red-600 text-white hover:bg-red-700" : "bg-green-600 text-white hover:bg-green-700"}`}
                >
                  {item.isdonneted ? "Donation Success" : "Donation Pending"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg">No records found for {hospitaluser.hospitalName}.</div>
      )}
    </div>
  );
}

export default HospInventory;