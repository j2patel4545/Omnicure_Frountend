import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import logo from './Group.png'

function Nav() {
  const [resNav, setResNav] = useState(true);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    if (route) navigate(route);
    setOpenSignUp(false);
    setOpenSignIn(false);
  };

  return (
    <div className="w-screen">
      <div className="backdrop-blur-0 bg-[#28574E] z-10 flex fixed justify-between items-center px-6 h-16 w-screen">
        {/* Logo */}
        <div className="flex items-center">
         <Link to='/'> <img src={logo} className="cursor-pointer h-8 w-auto" alt="Logo" /></Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-5 text-white">
          <Link className="hover:text-gray-300" to="/">Client Trial</Link>
          <Link className="hover:text-gray-300" to="/appointment">Appointment</Link>
          <Link className="hover:text-gray-300" to="/membership">Membership Goal</Link>
          <Link className="hover:text-gray-300" to="/medical-travel">Medical Travel</Link>

          {/* Sign Up Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-2 bg-transparent text-white rounded-md px-4 py-2 cursor-pointer hover:bg-white hover:text-[#28574E] transition"
              onClick={() => setOpenSignUp(!openSignUp)}
            >
              Sign Up  <FaChevronDown />
            </button>
            <AnimatePresence>
              {openSignUp && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 w-48 bg-white text-[#28574E] rounded-md shadow-lg overflow-hidden"
                >
                  <li className="p-2 hover:bg-[#28574E] hover:text-white cursor-pointer" onClick={() => handleNavigation('/register')}>
                    User
                  </li>
                  <li className="p-2 hover:bg-[#28574E] hover:text-white cursor-pointer" onClick={() => handleNavigation('/hospital')}>
                    Hospital
                  </li>
                  <li className="p-2 hover:bg-[#28574E] hover:text-white cursor-pointer" onClick={() => handleNavigation('/org')}>
                    Organization
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Sign In Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-2 bg-transparent text-white  rounded-md px-4 py-2 cursor-pointer hover:bg-white hover:text-[#28574E] transition"
              onClick={() => setOpenSignIn(!openSignIn)}
            >
              Sign in <FaChevronDown />
            </button>
            <AnimatePresence>
              {openSignIn && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 w-48 bg-white text-[#28574E] rounded-md shadow-lg overflow-hidden"
                >
                  <li className="p-2 hover:bg-[#28574E] hover:text-white cursor-pointer" onClick={() => handleNavigation('/donner/login')}>
                    User
                  </li>
                  <li className="p-2 hover:bg-[#28574E] hover:text-white cursor-pointer" onClick={() => handleNavigation('/hospital/login')}>
                    Hospital
                  </li>
                  <li className="p-2 hover:bg-[#28574E] hover:text-white cursor-pointer" onClick={() => handleNavigation('/organization/login')}>
                    Organization
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Book Now & Mobile Menu Toggle */}
        <div className="flex items-center">
          <button className="hidden sm:block rounded-full px-4 py-2 bg-white text-[#28574E] hover:bg-gray-300">
            Book Now
          </button>
          <div onClick={() => setResNav(!resNav)} className="sm:hidden text-white cursor-pointer text-2xl">
            ☰
          </div>
        </div>
      </div>

      {/* Responsive Menu */}
      <div className={`fixed flex flex-col z-20 top-0 ${resNav ? '-translate-y-full' : 'translate-y-0'} transition-transform duration-300 sm:hidden text-white text-xl bg-[#28574E] w-full h-screen items-center py-20 gap-6`}>
        <Link to="/">Home</Link>
        <Link to="/appointment">Appointment</Link>
        <Link to="/membership">Membership Goal</Link>
        <Link to="/medical-travel">Medical Travel</Link>

        {/* Sign Up Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-2 bg-transparent text-white border border-white rounded-md px-4 py-2 cursor-pointer"
            onClick={() => setOpenSignUp(!openSignUp)}
          >
            Sign Up As <FaChevronDown />
          </button>
          <AnimatePresence>
            {openSignUp && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 w-48 bg-white text-[#28574E] rounded-md shadow-lg overflow-hidden"
              >
                <li className="p-2 hover:bg-[#28574E] hover:text-white cursor-pointer" onClick={() => handleNavigation('/register')}>
                  User
                </li>
                <li className="p-2 hover:bg-[#28574E] hover:text-white cursor-pointer" onClick={() => handleNavigation('/hospital')}>
                  Hospital
                </li>
                <li className="p-2 hover:bg-[#28574E] hover:text-white cursor-pointer" onClick={() => handleNavigation('/org')}>
                  Organization
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Sign In Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-2 bg-transparent text-white border border-white rounded-md px-4 py-2 cursor-pointer"
            onClick={() => setOpenSignIn(!openSignIn)}
          >
            Sign In As <FaChevronDown />
          </button>
          <AnimatePresence>
            {openSignIn && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 w-48 bg-white text-[#28574E] rounded-md shadow-lg overflow-hidden"
              >
                <li className="p-2 hover:bg-[#28574E] hover:text-white cursor-pointer" onClick={() => handleNavigation('/donner/login')}>
                  User
                </li>
                <li className="p-2 hover:bg-[#28574E] hover:text-white cursor-pointer" onClick={() => handleNavigation('/hospital/login')}>
                  Hospital
                </li>
                <li className="p-2 hover:bg-[#28574E] hover:text-white cursor-pointer" onClick={() => handleNavigation('/organization/login')}>
                  Organization
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Nav;
