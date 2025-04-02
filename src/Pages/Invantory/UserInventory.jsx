import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import API from "../../API's/AuthAPI";
import UserContext from "../../Context/UserContext";

function UserInventory() {
    const { userdonner } = useContext(UserContext);
    const [userType, setUserType] = useState("require"); // 'require' or 'donate'
    const [Allhospitals, setAllHospitals] = useState([]);
    const [formData, setFormData] = useState({
        bloodType: "",
        details: "",
        hospital: "",
        age: "",
        donationDate: ""
    });

    const name = userdonner?.donnerName;
    const moNo = userdonner?.donnerMobileNo;
    const email = userdonner?.donnerEmail;
    const address = userdonner?.donnerAddress;
    const user = userdonner?._id;

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await axios.get(`${API}/hospital/hospitals`);
                setAllHospitals(response.data);
            } catch (error) {
                console.error("Failed to fetch hospitals:", error);
            }
        };
        fetchHospitals();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API}/inventory/add`, { 
                ...formData, 
                userType,
                name,
                user,
                moNo,
                email,
                address
            });

            toast.success("Request submitted successfully!");
            alert('Request submitted successfully');
            
            setFormData({
                bloodType: "",
                details: "",
                hospital: "",
                age: "",
                donationDate: ""
            });
        } catch (error) {
            console.error("Submission failed:", error);
            toast.error("Failed to submit request.");
            alert('Request submission failed');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-10 bg-gradient-to-r from-green-50 to-blue-50 shadow-xl rounded-3xl mt-12 border border-gray-300">
            <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-900">User Inventory</h2>
            
            <div className="flex justify-center mb-8">
                <button 
                    className={`px-8 py-4 rounded-l-2xl text-lg font-bold transition-all ${userType === "require" ? "bg-blue-700 text-white shadow-lg" : "bg-gray-300 hover:bg-gray-400"}`}
                    onClick={() => setUserType("require")}
                >Require Blood</button>
                <button 
                    className={`px-8 py-4 rounded-r-2xl text-lg font-bold transition-all ${userType === "donate" ? "bg-blue-700 text-white shadow-lg" : "bg-gray-300 hover:bg-gray-400"}`}
                    onClick={() => setUserType("donate")}
                >Donate Blood</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-md">
                <div>
                    <label className="block font-semibold text-gray-800">Blood Type:</label>
                    <select name="bloodType" value={formData.bloodType} onChange={handleChange} className="border p-4 w-full rounded-lg focus:ring-2 focus:ring-green-500">
                        <option value="">Select Blood Type</option>
                        {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block font-semibold text-gray-800">Select Hospital:</label>
                    <select name="hospital" value={formData.hospital} onChange={handleChange} className="border p-4 w-full rounded-lg focus:ring-2 focus:ring-green-500">
                        <option value="">Select Hospital</option>
                        {Allhospitals.map((hospital) => (
                            <option key={hospital._id} value={hospital.hospitalName}>{hospital.hospitalName}</option>
                        ))}
                    </select>
                </div>

                {userType === "require" && (
                    <div>
                        <label className="block font-semibold text-gray-800">Additional Details:</label>
                        <textarea name="details" value={formData.details} onChange={handleChange} className="border p-4 w-full rounded-lg focus:ring-2 focus:ring-green-500" placeholder="Enter details..."></textarea>
                    </div>
                )}

                {userType === "donate" && (
                    <>
                        <div>
                            <label className="block font-semibold text-gray-800">Your Age:</label>
                            <input type="number" name="age" value={formData.age} onChange={handleChange} className="border p-4 w-full rounded-lg focus:ring-2 focus:ring-green-500" placeholder="Enter age" />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-800">Appoint Schedule on Date:</label>
                            <input type="date" name="donationDate" value={formData.donationDate} onChange={handleChange} className="border p-4 w-full rounded-lg focus:ring-2 focus:ring-green-500" />
                        </div>
                    </>
                )}

                <button type="submit" className="bg-green-700 text-white px-8 py-4 rounded-lg w-full text-xl font-bold hover:bg-green-800 transition-all shadow-lg">
                    Apply to Schedule 
                </button>
            </form>
        </div>
    );
}

export default UserInventory;