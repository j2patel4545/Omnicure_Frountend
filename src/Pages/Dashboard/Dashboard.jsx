import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaSearch, FaEnvelope, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../Context/UserContext';
import API from '../../API\'s/AuthAPI';
import DasProfile from './dasProfile';
import { Link } from 'react-router-dom';
import DasNotification from './DasNotification';
import UserInventory from '../Invantory/UserInventory';
import Logo123 from './Logo123.png'
// import DonationRecords from './DonationRecords';
import DashFistPage from './DashFistPage';
import DonationRecords from './DonationRecords';

const Dashboard = () => {
   const { userdonner } = useContext(UserContext);
   const [activeContent, setActiveContent] = useState('Dashboard');
   const [user, setUser] = useState(null);
   const [username, setUsername] = useState('jetal');
   const [userProfile, setUserProfile] = useState(null);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      const fetchUserProfile = async () => {
         try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5001/api/users/profile', {
               headers: { Authorization: `Bearer ${token}` },
            });
            setUsername(response.data.username);
            setUserProfile(response.data);
         } catch (error) {
            console.error('Error fetching user profile:', error);
         }
      };
      fetchUserProfile();
   }, []);

   useEffect(() => {
      const abcd = localStorage.getItem("user");
      if (abcd) {
         setUser(JSON.parse(abcd));
      } else {
         navigate('/login');
         alert("Login First");
      }
   }, [navigate]);

   const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
   };

   const renderContent = () => {
      switch (activeContent) {
         case 'Dashboard': return  <DashFistPage/>;
         case 'Donor List': return <UserInventory />;
         case 'Donation Records': return < DonationRecords/>;
         case 'Notifications': return <DasNotification />;
         case 'Profile': return <DasProfile />;
         default: return <DashFistPage />;
      }
   };

   return (
      <div className="flex h-screen bg-[#FFFFFF]">
         <motion.div className="hidden fixed min-h-screen md:block w-[18vw] bg-[#28574E] text-white" initial={{ x: '-100%' }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
            <div className="p-4">
               <h2 className="text-2xl font-bold justify-center flex text-white">
                  <img src={Logo123} className='h-full w-[70%]' alt="Hospital Logo" />
               </h2>
            </div>
            <nav className="mt-10  space-y-4">
               {['Dashboard', 'Donor List', 'Donation Records', 'Notifications', 'Profile'].map((item) => (
                  <button key={item} className={`block w-full py-2.5 px-4 rounded transition duration-200 text-left ${activeContent === item ? 'bg-white text-[#28574E]' : 'hover:bg-[#1E232F]'}`} onClick={() => setActiveContent(item)}>
                     {item}
                  </button>
               ))}
            </nav>
         </motion.div>

         {isMobileMenuOpen && (
            <motion.div className="fixed top-0 left-0 w-1/2 h-full bg-[#28574E] text-white z-50" initial={{ x: '-100%' }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
               <div className="p-4">
                  <h2 className="text-2xl font-bold text-white">
                     <img src="./Group.png" className='h-full w-[70%]' alt="" />
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

         <div className="flex-1  ml-[18vw] min-w-[82vw] flex flex-col">
            <div className="flex justify-between backdrop-blur-sm items-center bg- fixed min-w-[82vw] shadow-md px-6 py-3">
               <div className="md:hidden">
                  <FaBars className="text-[#28574E] text-xl cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
               </div>
               <div className="flex items-center space-x-6">
                  <FaHome className="text-[#28574E] text-2xl md:text-4xl cursor-pointer" onClick={() => navigate('/')} />
                  <div className="hidden md:block relative">
                     <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#28574E]" />
                     <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  </div>
                  <FaEnvelope className="text-[#28574E] text-xl cursor-pointer" />
               </div>
               <div className="flex items-center space-x-3">
                  <motion.div className="flex items-center space-x-3 cursor-pointer" whileHover={{ scale: 1.1 }}>
                     <img onClick={() => setActiveContent('Profile')} src={`${API}${userdonner?.image}`} alt="User Profile" className="w-10 h-10 rounded-full object-cover" />
                     <span className="font-semibold text-[#28574E]">{userdonner ? userdonner.donnerName : "Loading..."}</span>
                  </motion.div>
                  <button className="text-[#28574E] text-xl" onClick={handleLogout}>
                     <FaSignOutAlt />
                  </button>
               </div>
            </div>
            <motion.div className="flex-1 pt-20 p-6" p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} key={activeContent}>
               {renderContent()}
            </motion.div>
         </div>
      </div>
   );
};


const DonorList = () => <div>Donor List</div>;
const Notifications = () => <div>Notifications</div>;

export default Dashboard;