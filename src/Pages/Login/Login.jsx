import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import image from "./loginImage.png"; // Ensure this image exists in the correct directory
import API from "../../API's/AuthAPI";
import UserContext from "../../Context/UserContext";

function Login() {
  const { setUserDonner } = useContext(UserContext);
  const [formData, setFormData] = useState({
    donnerEmail: "",
    donnerPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/donner/login`, formData);
      console.log("Login successful:", response.data);
      setUserDonner(response.data.user);
      alert("Success");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Fail");
    }
  };

  return (
    <div className="min-h-screen  flex justify-center items-center bg-gray-100 px-4">
      <div className="flex flex-col mt-12 md:flex-row w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex w-1/2 bg-gradient-to-r from-[#28574E] to-[#15332C] justify-center items-center p-10"
        >
          <img src={image} alt="Login" className="rounded-xl object-cover max-w-xs md:max-w-md" />
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex flex-col items-center p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Donor Login</h2>
          <form className="space-y-6 w-full max-w-sm" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="donnerEmail"
                value={formData.donnerEmail}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="donnerPassword"
                value={formData.donnerPassword}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                required
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-700 transition-all duration-300"
            >
              Login
            </motion.button>
          </form>

          {/* OR Separator */}
          <div className="flex items-center w-full max-w-sm mt-6">
            <div className="flex-1 border-b border-gray-300"></div>
            <p className="px-3 text-gray-500 text-sm">OR</p>
            <div className="flex-1 border-b border-gray-300"></div>
          </div>

          {/* Continue with Google */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 flex items-center justify-center w-full max-w-sm bg-white text-gray-700 px-6 py-3 border border-gray-300 rounded-xl shadow-md hover:bg-gray-100 transition-all duration-300"
          >
            <FcGoogle className="text-2xl mr-3" /> Continue with Google
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
