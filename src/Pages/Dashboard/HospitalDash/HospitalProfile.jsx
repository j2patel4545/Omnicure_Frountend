import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaHospital, FaEdit, FaTrash, FaAmbulance, FaUpload } from "react-icons/fa";
import axios from "axios";
import { HospitalContext } from "../../../Context/HospitalContextProvider";
import API from "../../../API's/AuthAPI";
import { toast } from "react-toastify";

function HospitalProfile() {
    const { hospitaluser, setHospitaluser } = useContext(HospitalContext);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        hospitalName: hospitaluser?.hospitalName || "",
        about: hospitaluser?.about || "",
        address: hospitaluser?.address || "",
        contactNumber: hospitaluser?.contactNumber || "",
        emergencyContact: hospitaluser?.emergencyContact || "",
        email: hospitaluser?.email || "",
        bloodRequirement: hospitaluser?.bloodRequirement || "",
        hospitalImage: null,
        hospitalLogo: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formDataObj = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value) formDataObj.append(key, value);
            });

            const response = await axios.put(`${API}/${hospitaluser._id}`, formDataObj, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setHospitaluser(response.data.hospital);
            setIsEditing(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this hospital profile? This action cannot be undone.")) {
            try {
                await axios.delete(`${API}/${hospitaluser._id}`);
                toast.success("Hospital profile deleted successfully!");
                setHospitaluser(null);
            } catch (error) {
                console.error("Delete failed:", error);
                toast.error("Failed to delete hospital profile.");
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl border border-gray-300 mt-10">
            <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center"
            >
                <img 
                    src={hospitaluser?.hospitalLogo ? `${API}${hospitaluser.hospitalLogo}` : "https://via.placeholder.com/150"}
                    alt="Hospital Logo" 
                    className="w-32 h-32 object-cover border-4 border-green-600 rounded-full"
                />
                {isEditing && <input type="file" name="hospitalLogo" accept="image/*" onChange={handleImageChange} className="mt-2" />}
            </motion.div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                {isEditing ? (
                    <>
                        <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} className="border p-2 rounded" placeholder="Hospital Name" />
                        <input type="text" name="about" value={formData.about} onChange={handleChange} className="border p-2 rounded" placeholder="About" />
                        <input type="text" name="address" value={formData.address} onChange={handleChange} className="border p-2 rounded" placeholder="Address" />
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 rounded" placeholder="Email" />
                        <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="border p-2 rounded" placeholder="Contact Number" />
                        <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} className="border p-2 rounded" placeholder="Emergency Contact" />
                        <input type="text" name="bloodRequirement" value={formData.bloodRequirement} onChange={handleChange} className="border p-2 rounded" placeholder="Blood Requirement" />
                        <label className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg cursor-pointer">
                            <FaUpload className="text-blue-600" />
                            <span>Upload Hospital Image</span>
                            <input type="file" name="hospitalImage" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </label>
                    </>
                ) : (
                    <>
                        <div className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg"><FaHospital className="text-blue-600 text-2xl" /><span>{hospitaluser?.hospitalName}</span></div>
                        <div className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg"><FaMapMarkerAlt className="text-blue-600 text-2xl" /><span>{hospitaluser?.address}</span></div>
                        <div className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg"><FaEnvelope className="text-blue-600 text-2xl" /><span>{hospitaluser?.email}</span></div>
                        <div className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg"><FaPhone className="text-blue-600 text-2xl" /><span>{hospitaluser?.contactNumber}</span></div>
                        <div className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg"><FaAmbulance className="text-red-600 text-2xl" /><span>Emergency: {hospitaluser?.emergencyContact}</span></div>
                    </>
                )}
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-4">
                {isEditing ? (
                    <>
                        <button onClick={handleSubmit} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">Save Changes</button>
                        <button onClick={() => setIsEditing(false)} className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700">Cancel</button>
                    </>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"><FaEdit /> <span>Edit Profile</span></button>
                )}
            </div>
        </div>
    );
}

export default HospitalProfile;
