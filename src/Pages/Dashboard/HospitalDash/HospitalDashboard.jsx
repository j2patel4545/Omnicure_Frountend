import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion'; // Animation library
import { FaHome, FaSearch, FaEnvelope, FaSignOutAlt, FaBars } from 'react-icons/fa'; // Icons
import { useNavigate } from 'react-router-dom'; // Navigation hook
import axios from 'axios'; // HTTP requests
import UserContext from '../../../Context/UserContext'; // User context
import { HospitalContext } from '../../../Context/HospitalContextProvider'; // Hospital context
import API from '../../../API\'s/AuthAPI'; // API endpoint
import DasProfile from '../dasProfile';
import { Link } from 'react-router-dom'; // Link component
import DasNotification from '../DasNotification';
import UserInventory from '../../Invantory/UserInventory';
import HospitalMainpage from './HospitalMainpage';
import HospitalProfile from './HospitalProfile';
import HospInventory from './HospInventory';
import Logo123 from './Logo123.png'; // Importing logo image

const HospitalDashboard = () => {
   const { hospitaluser } = useContext(HospitalContext); // Accessing hospital user data
   console.log(hospitaluser, "hello dashk");
   
   const { userdonner } = useContext(UserContext); // Accessing user donor data
   const [activeContent, setActiveContent] = useState('Dashboard'); // State for active tab
   const [user, setUser] = useState(null); // State for user info
   const [username, setUsername] = useState('jetal'); // Default username
   const [userProfile, setUserProfile] = useState(null); // State for user profile
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu toggle state
   const navigate = useNavigate(); // Navigation function

   // Fetch user profile on component mount
   useEffect(() => {
      const fetchUserProfile = async () => {
         try {
            const token = localStorage.getItem('token'); // Get token from local storage
            const response = await axios.get('http://localhost:5001/api/users/profile', {
               headers: { Authorization: `Bearer ${token}` },
            });
            setUsername(response.data.username); // Set username
            setUserProfile(response.data); // Set user profile data
         } catch (error) {
            console.error('Error fetching user profile:', error);
         }
      };
      fetchUserProfile();
   }, []);

   // Check if user is logged in
   useEffect(() => {
      const abcd = localStorage.getItem("user");
      if (abcd) {
         setUser(JSON.parse(abcd));
      } else {
         navigate('/login'); // Redirect to login if no user found
         alert("Login First");
      }
   }, [navigate]);

   // Logout function
   const handleLogout = () => {
      localStorage.removeItem('token'); // Remove token
      navigate('/login'); // Redirect to login
   };

   // Render content based on active tab
   const renderContent = () => {
      switch (activeContent) {
         case 'Dashboard': return <HospitalMainpage />;
         case 'Donor List': return <HospInventory />;
         case 'Donation Records': return "Loading...";
         case 'Notifications': return <DasNotification />;
         case 'Profile': return <HospitalProfile />;
         default: return <DashboardContent />;
      }
   };

   return (
      <div className="flex h-screen bg-[#FFFFFF]">
         {/* Sidebar */}
         <motion.div className="hidden md:block w-[18vw] fixed min-h-screen bg-[#28574E] text-white" initial={{ x: '-100%' }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
            <div className="p-4">
               {/* Logo Image */}
               <h2 className="text-2xl font-bold justify-center flex text-white">
                  <img src={Logo123} className='h-full w-[70%]' alt="Hospital Logo" />
               </h2>
            </div>
            {/* Sidebar Navigation */}
            <nav className="mt-10 space-y-4">
               {['Dashboard', 'Donor List', 'Donation Records', 'Notifications', 'Profile'].map((item) => (
                  <button key={item} className={`block w-full py-2.5 px-4 rounded transition duration-200 text-left ${activeContent === item ? 'bg-white text-[#28574E]' : 'hover:bg-[#1E232F]'}`} onClick={() => setActiveContent(item)}>
                     {item}
                  </button>
               ))}
            </nav>
         </motion.div>

         {/* Mobile Menu */}
         {isMobileMenuOpen && (
            <motion.div className="fixed top-0 left-0 w-1/2 h-full bg-[#28574E] text-white z-50" initial={{ x: '-100%' }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
               <div className="p-4">
                  <h2 className="text-2xl font-bold text-white">
                     <img src={Logo123} className='h-full w-[70%]' alt="Hospital Logo" />
                  </h2>
               </div>
               <nav className="mt-10 space-y-4">
                  {['Dashboard', 'Donor List', 'Donation Records', 'Notifications', 'Profile'].map((item) => (
                     <button key={item} className={`block w-full py-2.5 px-4 rounded transition duration-200 text-left ${activeContent === item ? 'bg-white text-[#28574E]' : 'hover:bg-[#1E232F]'}`} onClick={() => { setActiveContent(item); setIsMobileMenuOpen(false); }}>
                        {item}
                     </button>
                  ))}
               </nav>
            </motion.div>
         )}

         {/* Main Content */}
         <div className="flex-1 ml-[18vw] flex flex-col">
            <div className="flex justify-between fixed min-w-[82vw] items-center bg-white shadow-md px-6 py-3">
               {/* Mobile Menu Toggle */}
               <div className="md:hidden">
                  <FaBars className="text-[#28574E] text-xl cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
               </div>
               {/* Top Bar */}
               <div className="flex items-center space-x-6">
                  <FaHome className="text-[#28574E] text-2xl md:text-4xl cursor-pointer" onClick={() => navigate('/')} />
                  <div className="hidden md:block relative">
                     <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#28574E]" />
                     <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  </div>
                  <FaEnvelope className="text-[#28574E] text-xl cursor-pointer" />
               </div>
               {/* Profile Section */}
               <motion.div className="flex items-center w-full justify-end px-3  space-x-3 cursor-pointer" whileHover={{ scale: 1.1 }}>
                  <img onClick={() => setActiveContent('Profile')} src={`${API}${hospitaluser?.hospitalLogo}`} alt="logo" className="w-10 border-[2px] h-10 rounded-full object-cover" />
                  <span className="font-semibold text-[#28574E]">{hospitaluser ? hospitaluser.hospitalName : "Loading..."}</span>
               </motion.div>
               <button className="text-[#28574E] text-xl" onClick={handleLogout}><FaSignOutAlt /></button>
            </div>
            {/* Page Content */}
            <motion.div className="flex-1 p-6 mt-16">{renderContent()}</motion.div>
         </div>
      </div>
   );
};

export default HospitalDashboard;
