import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import API from "../../API's/AuthAPI";
import UserContext from "../../Context/UserContext";
import axios from "axios";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const DashFirstPage = () => {
    const [donations, setDonations] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userdonner } = useContext(UserContext); // Fetch userdonner from context
    
    // Fetch donations from API
    useEffect(() => {
        if (!userdonner || !userdonner._id) return; // Ensure userdonner exists
        
        const fetchDonations = async () => {
            try {
                setLoading(true);  // Start loading
                const response = await axios.get(`${API}/inventory/get`);
                // Filter donations for the specific user
                const filteredDonations = response.data.filter(
                    (temp) => temp.user === userdonner._id
                );
                setDonations(filteredDonations);
            } catch (error) {
                console.error("Failed to fetch donations:", error);
                setError("Failed to fetch donations. Please try again later.");
            } finally {
                setLoading(false); // Stop loading
            }
        };
        fetchDonations();
    }, [userdonner]); // Trigger useEffect when userdonner changes

    // Process donations data for chart
    useEffect(() => {
        const donationData = {};
        donations.forEach((user) => {
            if (user.donationDate) {
                const date = user.donationDate.split("T")[0]; // Extract date only
                if (!donationData[date]) {
                    donationData[date] = { date, donations: 0, requests: 0 };
                }
                if (user.userType === "donate") {
                    donationData[date].donations += 1;
                } else if (user.userType === "require") {
                    donationData[date].requests += 1;
                }
            }
        });

        setChartData(Object.values(donationData));
    }, [donations]);

    // Calculate total donations
    const totalDonations = donations.filter((temp) => temp.isdonneted).length;

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>{error}</div>; // Show error state
    }

    return (
        <motion.div
            className="w-full p-6 bg-white shadow-lg rounded-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className="text-2xl font-bold text-center mb-6">
                Donation vs Request Over Time
            </h2>
            <p className="text-center mb-6">Total Donations: {totalDonations}</p>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <XAxis dataKey="date" stroke="#333" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="donations"
                        stroke="#4CAF50"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Donations"
                    />
                    <Line
                        type="monotone"
                        dataKey="requests"
                        stroke="#F44336"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Requests"
                    />
                </LineChart>
            </ResponsiveContainer>
        </motion.div>
    );
};

export default DashFirstPage;
