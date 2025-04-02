import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import API from "../../API's/AuthAPI";
import { useNavigate } from "react-router-dom";
import { HospitalContext } from "../../Context/HospitalContextProvider";


const HospitalLogin = () => {
     const {setHospitaluser} = useContext(HospitalContext);
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API}/hospital/login`, loginData);
            alert(response.data.message);
            setHospitaluser(response.data.hospital)
            // console.log(response.data.hospital);
            
            navigate('/hospital/das')
        } catch (error) {
            setErrorMessage(error.response?.data?.error || "Invalid credentials!");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen px-4">
            <motion.form 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit} 
                className="p-8 max-w-lg w-full bg-[#28574E] bg-opacity backdrop-blur-lg shadow-2xl rounded-lg"
            >
                <h2 className="text-3xl font-bold text-center text-white mb-6">Hospital Login</h2>
                
                <div className="space-y-6">
                    {Object.keys(loginData).map((key) => (
                        <div key={key} className="relative">
                            <input 
                                type={key === "password" ? "password" : "text"} 
                                name={key} 
                                value={loginData[key]} 
                                onChange={handleChange} 
                                placeholder={key}
                                required 
                                className="w-full p-3 bg-transparent border-b-2 border-white text-white focus:outline-none focus:border-yellow-400 peer"
                            />
                            {/* <label className="absolute left-3 top-3 text-white text-sm transition-all duration-200 peer-placeholder-shown:top-10 peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-white">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </label> */}
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
                    Login
                </motion.button>

                <div className="mt-6 flex items-center justify-center">
                    <div className="border-t border-white w-full"></div>
                    <span className="text-white px-3">OR</span>
                    <div className="border-t border-white w-full"></div>
                </div>

                <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    type="button" 
                    className="mt-6 w-full flex items-center justify-center bg-white text-gray-900 font-bold py-3 rounded-lg shadow-lg"
                >
                    <FcGoogle className="text-2xl mr-2" /> Login with Google
                </motion.button>
            </motion.form>
        </div>
    );
};

export default HospitalLogin;
