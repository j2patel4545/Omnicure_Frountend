import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
    const [formData, setFormData] = useState({
        userFirstName: "",
        userLastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        gender: "",
        dateOfBirth: "",
        bloodGroup: "",
        adharCardNo: "",
        profileImage: null
    });

    const handleChange = (e) => {
        if (e.target.name === "profileImage") {
            setFormData({ ...formData, profileImage: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach((key) => {
                formDataToSend.append(key, formData[key]);
            });

            const response = await axios.post(
                "http://localhost:7898/api/users/register",
                formDataToSend,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
                alert("successfully")
            toast.success("User registered successfully!");
            console.log(response.data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed!");
            console.error(error);
            alert("Failed")

        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="userFirstName" placeholder="First Name" onChange={handleChange} required className="w-full p-2 border rounded"/>
                <input type="text" name="userLastName" placeholder="Last Name" onChange={handleChange} required className="w-full p-2 border rounded"/>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border rounded"/>
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border rounded"/>
                <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required className="w-full p-2 border rounded"/>
                
                <select name="gender" onChange={handleChange} required className="w-full p-2 border rounded">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <input type="date" name="dateOfBirth" onChange={handleChange} required className="w-full p-2 border rounded"/>
                
                <select name="bloodGroup" onChange={handleChange} required className="w-full p-2 border rounded">
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

                <input type="text" name="adharCardNo" placeholder="Aadhar Card Number" onChange={handleChange} required className="w-full p-2 border rounded"/>
                
                <input type="file" name="profileImage" accept="image/*" onChange={handleChange} className="w-full p-2 border rounded"/>
                
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Register</button>
            </form>
        </div>
    );
};

export default Register;
