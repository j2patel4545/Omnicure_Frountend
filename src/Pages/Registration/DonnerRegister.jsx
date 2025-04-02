import API from "../../API's/AuthAPI.js";
import { useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";

const DonnerRegister = () => {
  const [product, setProduct] = useState({
    donnerName: "",
    donnerMobileNo: "",
    donnerDOB:"",
    donnerEmail: "",
    donnerPassword: "",
    donnerBloodGroup: "",
    donnerAddress: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { donnerName,donnerDOB, donnerMobileNo, donnerEmail, donnerPassword, donnerBloodGroup, donnerAddress, image } = product;

    if (!donnerName || !donnerDOB || !donnerMobileNo || !donnerEmail || !donnerPassword || !donnerBloodGroup || !donnerAddress || !image) {
      setMessage("❌ All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("donnerName", donnerName);
    formData.append("donnerMobileNo", donnerMobileNo);
    formData.append("donnerDOB", donnerDOB);
    formData.append("donnerEmail", donnerEmail);
    formData.append("donnerPassword", donnerPassword);
    formData.append("donnerBloodGroup", donnerBloodGroup);
    formData.append("donnerAddress", donnerAddress);
    formData.append("image", image);

    try {
      const response = await axios.post(`${API}/donner/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Donor added successfully!");
      setProduct({
        donnerName: "",
        donnerDOB:"",
        donnerMobileNo: "",
        donnerEmail: "",
        donnerPassword: "",
        donnerBloodGroup: "",
        donnerAddress: "",
        image: null,
      });
      setPreview(null);
      console.log(response.data);
    } catch (error) {
      setMessage("❌ Error adding donor. Please try again.");
      console.error("API Error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full shadow-2xl">
      <h2 className="text-[#28574E] pt-20 text-2xl font-bold text-center mb-5">Add Blood Donor</h2>

      <div className="w-[80%] mb-8 flex bg-white/90 p-4 rounded-xl shadow-xl border border-gray-200">
        {/* Left Side - Image */}
        <div className="w-[50%] flex bg-gradient-to-r to-slate-100 via-teal-600 from-teal-700 rounded-l-2xl">
          <img className="h-full w-full object-cover" src="/rag.png" alt="Blood Donation" />
        </div>

        {/* Right Side - Form */}
        <form onSubmit={handleSubmit} className="px-3 py-4 bg-gradient-to-r from-slate-100 via-teal-600 to-teal-700 rounded-r-2xl w-[50%] space-y-5">
          {/* Donor Name */}
          <div>
            <label className="block text-[#28574E] font-medium">Donor Name</label>
            <input
              type="text"
              name="donnerName"
              value={product.donnerName}
              onChange={handleChange}
              placeholder="Enter Donor Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#28574E] outline-none shadow-sm"
              required
            />
          </div>

          {/* Donor Mobile Number */}
          <div>
            <label className="block text-[#28574E] font-medium">Mobile No</label>
            <input
              type="text"
              name="donnerMobileNo"
              value={product.donnerMobileNo}
              onChange={handleChange}
              placeholder="Enter Mobile Number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#28574E] outline-none shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-[#28574E] font-medium">DBO</label>
            <input
              type="text"
              name="donnerDOB"
              value={product.donnerDOB}
              onChange={handleChange}
              placeholder="Enter DOB"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#28574E] outline-none shadow-sm"
              required
            />
          </div>

          {/* Donor Email */}
          <div>
            <label className="block text-[#28574E] font-medium">Email</label>
            <input
              type="email"
              name="donnerEmail"
              value={product.donnerEmail}
              onChange={handleChange}
              placeholder="Enter Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#28574E] outline-none shadow-sm"
              required
            />
          </div>

          {/* Donor Password */}
          <div>
            <label className="block text-[#28574E] font-medium">Password</label>
            <input
              type="password"
              name="donnerPassword"
              value={product.donnerPassword}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#28574E] outline-none shadow-sm"
              required
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-[#28574E] font-medium">Blood Group</label>
            <select
              name="donnerBloodGroup"
              value={product.donnerBloodGroup}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#28574E] outline-none shadow-sm"
              required
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>

          {/* Donor Address */}
          <div>
            <label className="block text-[#28574E] font-medium">Address</label>
            <input
              type="text"
              name="donnerAddress"
              value={product.donnerAddress}
              onChange={handleChange}
              placeholder="Enter Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#28574E] outline-none shadow-sm"
              required
            />
          </div>

          {/* File Upload */}
          <div className="border-2 border-dashed border-[#28574E] rounded-lg p-6 text-center relative hover:bg-gray-50 transition-all">
            <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required />
            <FaCloudUploadAlt className="text-[#28574E] text-5xl mx-auto" />
            <p className="text-[#28574E] font-medium mt-2">Upload an Image</p>
          </div>

          {/* Image Preview */}
          {preview && <img src={preview} alt="Preview" className="w-40 h-40 mx-auto rounded-lg border-4 border-[#28574E]" />}

          {/* Submit Button */}
          <button type="submit" className="w-full bg-[#28574E] text-white py-3 rounded-lg font-semibold text-lg">Add Donor</button>

          {message && <p className="text-center text-white font-medium mt-3">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default DonnerRegister;
