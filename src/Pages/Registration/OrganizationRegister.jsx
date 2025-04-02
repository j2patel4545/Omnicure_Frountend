import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaBuilding, FaEnvelope, FaPhone, FaLock, FaMapMarkerAlt, FaUserShield, FaUpload } from "react-icons/fa";
import axios from "axios";
import API from "../../API's/AuthAPI";

const OrganizationRegister = () => {
  const [formData, setFormData] = useState({
    organizationName: "",
    email: "",
    password: "",
    address: "",
    contactNumber: "",
    emergencyContact: "",
    bloodRequirement: "",
    about: "",
  });

  const [organizationImage, setOrganizationImage] = useState(null);
  const [organizationLogo, setOrganizationLogo] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (e.target.name === "organizationImage") setOrganizationImage(file);
    if (e.target.name === "organizationLogo") setOrganizationLogo(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.organizationName || !formData.email || !formData.password) {
      toast.error("Please fill all required fields!");
      return;
    }

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => formDataObj.append(key, formData[key]));
    if (organizationImage) formDataObj.append("organizationImage", organizationImage);
    if (organizationLogo) formDataObj.append("organizationLogo", organizationLogo);

    try {
      const response = await axios.post(`${API}/org/register`, formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        toast.success("Organization Registered Successfully!");
        setFormData({
          organizationName: "",
          email: "",
          password: "",
          address: "",
          contactNumber: "",
          emergencyContact: "",
          bloodRequirement: "",
          about: "",
        });
        setOrganizationImage(null);
        setOrganizationLogo(null);
      }
      alert("register Success")
    } catch (error) {
      toast.error("Registration Failed!");
    }
  };

  return (
    <motion.div className="min-h-screen flex pt-20 items-center justify-center bg-[#28574E] p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <motion.div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-[#28574E] text-center mb-6">Register Organization</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <InputField icon={FaBuilding} name="organizationName" placeholder="Organization Name" value={formData.organizationName} onChange={handleChange} />
            <InputField icon={FaEnvelope} name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <InputField icon={FaLock} name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <InputField icon={FaMapMarkerAlt} name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
            <InputField icon={FaPhone} name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} />
            <InputField icon={FaUserShield} name="emergencyContact" placeholder="Emergency Contact" value={formData.emergencyContact} onChange={handleChange} />
          </div>

          <div>
            <label className="text-gray-600 font-semibold">Blood Requirement</label>
            <select name="bloodRequirement" className="input-field" value={formData.bloodRequirement} onChange={handleChange} required>
              <option value="">Select Blood Requirement</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <div>
            <textarea name="about" placeholder="About Organization" className="input-field" value={formData.about} onChange={handleChange} required></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FileUpload label="Organization Image" name="organizationImage" file={organizationImage} onChange={handleFileChange} />
            <FileUpload label="Organization Logo" name="organizationLogo" file={organizationLogo} onChange={handleFileChange} />
          </div>

          <motion.button type="submit" className="btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Register Organization
          </motion.button>
        </form>
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
    {/*  */}
  </div>
);

const FileUpload = ({ label, name, file, onChange }) => (
  <div>
    <label className="text-gray-600 font-semibold">{label}</label>
    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-500 transition">
      <input type="file" name={name} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={onChange} />
      <FaUpload className="text-gray-400 text-3xl mx-auto mb-2" />
      <p className="text-gray-500">{file ? file.name : "Click or Drag & Drop to Upload"}</p>
    </div>
  </div>
);

export default OrganizationRegister;
