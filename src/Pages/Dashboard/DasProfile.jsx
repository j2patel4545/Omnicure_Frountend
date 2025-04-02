import React, { useContext, useState } from "react";
import UserContext from "../../Context/UserContext";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaCalendarAlt, FaEdit, FaTrash, FaHandHoldingHeart } from "react-icons/fa";
import axios from "axios";
import API from "../../API's/AuthAPI";

function DasProfile() {
    const { userdonner, setUserDonner } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        donnerName: userdonner?.donnerName || "",
        donnerMobileNo: userdonner?.donnerMobileNo || "",
        donnerEmail: userdonner?.donnerEmail || "",
        donnerBloodGroup: userdonner?.donnerBloodGroup || "",
        donnerAddress: userdonner?.donnerAddress || "",
        image: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataObj = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataObj.append(key, value);
            });

            const response = await axios.put(`${API}/${userdonner._id}`, formDataObj, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setUserDonner(response.data.donor);
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Update failed:", error);
            alert("Failed to update profile.");
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                await axios.delete(`${API}/${userdonner._id}`);
                alert("Account deleted successfully!");
                setUserDonner(null);
            } catch (error) {
                console.error("Delete failed:", error);
                alert("Failed to delete account.");
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl border border-gray-300 mt-10">
            <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center"
            >
                <img 
                    src={formData.image ? URL.createObjectURL(formData.image) : `${API}${userdonner?.image}`} 
                    alt="Profile" 
                    className="w-40 h-40 object-cover border-4 border-green-600 rounded-full"
                />
                {isEditing && <input type="file" accept="image/*" onChange={handleImageChange} className="mt-2" />}
            </motion.div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                {isEditing ? (
                    <>
                        <input type="text" name="donnerName" value={formData.donnerName} onChange={handleChange} className="border p-2 rounded" placeholder="Full Name" />
                        <input type="text" name="donnerBloodGroup" value={formData.donnerBloodGroup} onChange={handleChange} className="border p-2 rounded" placeholder="Blood Group" />
                        <input type="text" name="donnerAddress" value={formData.donnerAddress} onChange={handleChange} className="border p-2 rounded" placeholder="Address" />
                        <input type="email" name="donnerEmail" value={formData.donnerEmail} onChange={handleChange} className="border p-2 rounded" placeholder="Email" />
                        <input type="text" name="donnerMobileNo" value={formData.donnerMobileNo} onChange={handleChange} className="border p-2 rounded" placeholder="Mobile No" />
                    </>
                ) : (
                    <>
                        <div className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg">
                            <FaMapMarkerAlt className="text-green-600 text-2xl" />
                            <span className="text-lg font-medium">{userdonner?.donnerAddress}</span>
                        </div>
                        <div className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg">
                            <FaEnvelope className="text-green-600 text-2xl" />
                            <span className="text-lg font-medium">{userdonner?.donnerEmail}</span>
                        </div>
                        <div className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg">
                            <FaPhone className="text-green-600 text-2xl" />
                            <span className="text-lg font-medium">{userdonner?.donnerMobileNo}</span>
                        </div>
                        <div className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg">
                            <FaCalendarAlt className="text-green-600 text-2xl" />
                            <span className="text-lg font-medium">Joined: {new Date(userdonner?.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg">
                            <FaHandHoldingHeart className="text-red-600 text-2xl" />
                            <span className="text-lg font-medium">Donations: {userdonner?.donationHistory || 0}</span>
                        </div>
                        <div className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg">
                            <FaCalendarAlt className="text-blue-600 text-2xl" />
                            <span className="text-lg font-medium">Date of Birth: {userdonner?.donnerDOB || 0}</span>
                        </div>
                    </>
                )}
            </div>

            <div className="mt-6 flex flex-col md:flex-row justify-center space-y-4 md:space-x-4 md:space-y-0">
                {isEditing ? (
                    <button onClick={handleSubmit} className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700">
                        Save Changes
                    </button>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:bg-blue-700">
                        <FaEdit /> <span>Edit Profile</span>
                    </button>
                )}
                <button onClick={handleDelete} className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:bg-red-700">
                    <FaTrash /> <span>Delete Account</span>
                </button>
            </div>
        </div>
    );
}

export default DasProfile;