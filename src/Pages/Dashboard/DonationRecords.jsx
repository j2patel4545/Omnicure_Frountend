import React, { useContext, useEffect, useState } from "react";
import { FaDownload, FaFileImage, FaHandHoldingHeart } from "react-icons/fa";
import API from "../../API's/AuthAPI";
import axios from "axios";
import UserContext from "../../Context/UserContext";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Logo123 from "./Logo123.png";

function DonationRecords() {
  const { userdonner } = useContext(UserContext);
  const [donations, setDonations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(`${API}/inventory/get`);
        const filteredDonations = response.data.filter((temp) => temp.user === userdonner._id);
        setDonations(filteredDonations);
      } catch (error) {
        console.error("Failed to fetch donations:", error);
      }
    };
    fetchDonations();
  }, [userdonner._id]);

  const totalDonations = donations.filter((temp) => temp.isdonneted).length;

  const generatePDF = () => {
    const certificateDiv = document.getElementById("certificate");
    
    html2canvas(certificateDiv, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
  
      pdf.addImage(imgData, "PNG", 0, 10, imgWidth, imgHeight);
      pdf.save(`${selectedUser.name}_Donation_Certificate.pdf`);
    });
  };

  const generateImage = () => {
    const certificateDiv = document.getElementById("certificate");
    html2canvas(certificateDiv).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${selectedUser.name}_Donation_Certificate.png`;
      link.click();
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl border border-gray-300 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaHandHoldingHeart className="text-[#28574E]" /> Blood Donation Records
        </h2>
        <p className="text-lg font-semibold text-green-600">Total Donations: {totalDonations}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {donations.map((temp, index) => (
          <div key={index} className="p-6 border rounded-lg shadow-md bg-white">
            <h2 className="font-bold text-gray-800 text-lg">{temp.name}</h2>
            <p className="text-gray-600">Blood Type: {temp.bloodType}</p>
            <p className="text-gray-600">{temp.userType} Apply Date: {new Date(temp.donationDate).toLocaleDateString()}</p>
            <p className="text-gray-600">Hospital: {temp.hospital}</p>
            <p className={`text-md font-semibold mt-2 ${temp.isdonneted ? "text-green-600" : "text-red-600"}`}>
              {(temp.isdonneted && temp.userType) ? "Donation Completed" : "Pending Donation"}
              <h2>
                
              </h2>
            </p>
            {temp.isdonneted && (
              <button
                className="mt-4 flex items-center text-blue-600 hover:underline"
                onClick={() => setSelectedUser(temp)}
              >
                <FaDownload className="mr-2" /> View Certificate
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="mt-10 p-8 bg-gradient-to-br from-white to-gray-100 shadow-xl rounded-xl border border-gray-400 text-center" id="certificate">
          <div className="border-4 border-[#28574E] p-6 rounded-lg bg-white">
           <div className=" flex justify-between rounded-t-md bg-[#28574E] my-1"> <img src={Logo123} alt="Logo" className="mx-auto py-2" /></div>
            <h2 className="text-3xl font-extrabold text-gray-800">Certificate of Blood Donation</h2>
            <p className="text-lg mt-4 italic text-gray-600">This certifies that</p>
            <h3 className="text-2xl font-bold text-red-600">{selectedUser.name}</h3>
            <p className="text-md mt-2">has voluntarily donated blood at</p>
            <h3 className="text-lg font-semibold text-gray-800">{selectedUser.hospital} Hospital</h3>
            <p className="text-md mt-2">On {new Date(selectedUser.donationDate).toLocaleDateString()}</p>
            <p className="text-md mt-4 font-semibold text-green-600">Thank you for your kindness and generosity!</p>
            <div className="mt-6 flex justify-between items-center border-t pt-4">
              <div className="text-left">
                <p className="font-semibold text-gray-700">Authorized By: Omnicure</p>
                <p className="italic">Medical Supervisor</p>
              </div>
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-xl">
                <p>Official Appr</p>
              </div>
            </div>
           
          </div>
        </div>
      )}
       {selectedUser && (<div className="flex justify-center gap-4 mt-6">
              <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={generatePDF}>
                <FaDownload className="mr-2" /> Download as PDF
              </button>
              <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700" onClick={generateImage}>
                <FaFileImage className="mr-2" /> Download as Image
              </button>
            </div> )}
    </div>
  );
}

export default DonationRecords;
