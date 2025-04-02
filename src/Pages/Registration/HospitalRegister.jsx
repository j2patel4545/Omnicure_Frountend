import { useState } from "react";
import { motion } from "framer-motion";
import { FiUploadCloud } from "react-icons/fi";
import axios from "axios";
import API from "../../API's/AuthAPI";

const HospitalRegistration = () => {
    const [hospitalData, setHospitalData] = useState({
        hospitalName: "",
        address: "",
        email: "",
        password: "",
        contactNumber: "",
        emergencyContact: "",
        bloodRequirement: "",
        about: "",
    });

    const [hospitalImage, setHospitalImage] = useState(null);
    const [hospitalLogo, setHospitalLogo] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [previewLogo, setPreviewLogo] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setHospitalData({ ...hospitalData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            setErrorMessage("Only image files are allowed.");
            return;
        }
        if (e.target.name === "hospitalImage") {
            setHospitalImage(file);
            setPreviewImage(URL.createObjectURL(file));
        } else if (e.target.name === "hospitalLogo") {
            setHospitalLogo(file);
            setPreviewLogo(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(hospitalData).forEach((key) => {
            formData.append(key, hospitalData[key]);
        });
        if (hospitalImage) formData.append("hospitalImage", hospitalImage);
        if (hospitalLogo) formData.append("hospitalLogo", hospitalLogo);

        try {
            const response = await axios.post(`${API}/hospital/register`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert(response.data.message);
        } catch (error) {
            setErrorMessage(error.response?.data?.error || "Something went wrong!");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen  px-4">
            <motion.form 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit} 
                className="p-8 max-w-3xl w-full bg-[#28574E] bg-opacity backdrop-blur-lg shadow-2xl rounded-lg"
            >
                <h2 className="text-3xl font-bold text-center text-white mb-6">Hospital Registration</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.keys(hospitalData).map((key) => (
                        <div key={key} className="relative">
                            <input 
                                type={key === "password" ? "password" : "text"} 
                                name={key} 
                                value={hospitalData[key]} 
                                onChange={handleChange} 
                                placeholder={key}                                required 
                                className="w-full p-3 bg-transparent border-b-2 border-white text-white focus:outline-none focus:border-yellow-400"
                            />
                            {/* <label className="absolute left-3 top-2 text-white text-sm transition-all duration-200">{key.replace(/([A-Z])/g, ' $1').trim()}</label> */}
                        </div>
                    ))}
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 mt-6">
                    {[["hospitalImage", previewImage, setHospitalImage, setPreviewImage], ["hospitalLogo", previewLogo, setHospitalLogo, setPreviewLogo]].map(([name, preview, setFile, setPreview], idx) => (
                        <div key={idx} className="w-full border-2 border-dashed border-white p-6 text-center cursor-pointer" onClick={() => document.getElementById(name).click()}>
                            <input type="file" id={name} name={name} accept="image/*" onChange={handleFileChange} className="hidden" />
                            {preview ? (
                                <img src={preview} alt={name} className="w-32 h-32 object-cover mx-auto" />
                            ) : (
                                <div className="text-white flex flex-col items-center">
                                    <FiUploadCloud className="text-4xl mb-2" />
                                    <span>Upload {name === "hospitalImage" ? "Hospital Image" : "Logo"}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {errorMessage && <p className="text-red-500 mt-2 text-center">{errorMessage}</p>}
                
                <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    type="submit" 
                    className="mt-6 w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded-lg shadow-lg"
                >
                    Register
                </motion.button>
            </motion.form>
        </div>
    );
};

export default HospitalRegistration;
