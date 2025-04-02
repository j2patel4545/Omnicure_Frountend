import { useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";

const Admin = () => {
  const [product, setProduct] = useState({
    donnerName: "",
    donnerMobileNo: "",
    donnerEmail: "",
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
    const { donnerName, donnerMobileNo, donnerEmail, donnerBloodGroup, donnerAddress, image } = product;

    if (!donnerName || !donnerMobileNo || !donnerEmail || !donnerBloodGroup || !donnerAddress || !image) {
      setMessage("❌ All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("donnerName", donnerName);
    formData.append("donnerMobileNo", donnerMobileNo);
    formData.append("donnerEmail", donnerEmail);
    formData.append("donnerBloodGroup", donnerBloodGroup);
    formData.append("donnerAddress", donnerAddress);
    formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:8799/product/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Donor added successfully!");
      setProduct({
        donnerName: "",
        donnerMobileNo: "",
        donnerEmail: "",
        donnerBloodGroup: "",
        donnerAddress: "",
        image: null,
      });
      setPreview(null);
      console.log(response.data);
    } catch (error) {
      setMessage("❌ Error adding donor!");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-gray-200">
        {message && <p className="mb-4 text-center text-red-500 font-medium">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Donor Name */}
          <div>
            <label className="block text-gray-700 font-medium">Donor Name</label>
            <input
              type="text"
              name="donnerName"
              value={product.donnerName}
              onChange={handleChange}
              placeholder="Enter Donor Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
              required
            />
          </div>

          {/* Donor Mobile Number */}
          <div>
            <label className="block text-gray-700 font-medium">Donor Mobile No</label>
            <input
              type="text"
              name="donnerMobileNo"
              value={product.donnerMobileNo}
              onChange={handleChange}
              placeholder="Enter Mobile Number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
              required
            />
          </div>

          {/* Donor Email */}
          <div>
            <label className="block text-gray-700 font-medium">Donor Email</label>
            <input
              type="email"
              name="donnerEmail"
              value={product.donnerEmail}
              onChange={handleChange}
              placeholder="Enter Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
              required
            />
          </div>

          {/* Donor Blood Group - Select */}
          <div>
            <label className="block text-gray-700 font-medium">Blood Group</label>
            <select
              name="donnerBloodGroup"
              value={product.donnerBloodGroup}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
              required
            >
              <option value="">Select Blood Group</option>
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

          {/* Donor Address */}
          <div>
            <label className="block text-gray-700 font-medium">Donor Address</label>
            <input
              type="text"
              name="donnerAddress"
              value={product.donnerAddress}
              onChange={handleChange}
              placeholder="Enter Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
              required
            />
          </div>

          {/* File Upload */}
          <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center relative hover:bg-gray-50 transition-all">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              required
            />
            <FaCloudUploadAlt className="text-gray-400 text-5xl mx-auto" />
            <p className="text-gray-600 font-medium mt-2">Click or Drag & Drop Your Image</p>
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="flex justify-center">
              <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded-lg border-4 border-blue-300 shadow-md" />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:shadow-lg transition-all"
          >
            Add Donor
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
