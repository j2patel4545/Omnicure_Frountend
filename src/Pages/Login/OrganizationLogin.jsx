import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import axios from "axios";
import API from "../../API's/AuthAPI";

const OrganizationLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password!");
      return;
    }

    try {
      const response = await axios.post(`${API}/org/login`, formData);

      if (response.status === 200) {
        toast.success("Login Successful!");
        alert("Sucess")
        navigate("/org/dashboard"); // Navigate on success
      }
    } catch (error) {
      toast.error("Login Failed! Please check your credentials.");
      alert("Failed")
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-[#28574E] p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-[#28574E] text-center mb-6">Organization Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField icon={FaEnvelope} name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <InputField icon={FaLock} name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />

          <motion.button
            type="submit"
            className="w-full bg-[#28574E] text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>

        <div className="mt-4 flex items-center justify-center">
          <div className="border-t w-1/3"></div>
          <span className="px-3 text-gray-500">OR</span>
          <div className="border-t w-1/3"></div>
        </div>

        <motion.button
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-100 transition mt-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGoogle className="text-red-500" />
          Continue with Google
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const InputField = ({ icon: Icon, name, type = "text", placeholder, value, onChange }) => (
  <div className="relative w-full">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="peer block w-full border border-gray-300 rounded-lg px-10 py-3 text-teal-800 focus:outline-none focus:ring-2 focus:ring-[#28574E] focus:border-[#28574E]"
      required
    />
    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
  </div>
);

export default OrganizationLogin;
