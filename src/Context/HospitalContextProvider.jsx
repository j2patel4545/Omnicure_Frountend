import React, { createContext, useState, useEffect } from "react";

export const HospitalContext = createContext();

function HospitalContextProvider({ children }) {
  const [hospitaluser, setHospitaluser] = useState(() => {
    // Retrieve hospital user data from localStorage on initial load
    const savedHospitalUser = localStorage.getItem("hospitalUser");
    return savedHospitalUser ? JSON.parse(savedHospitalUser) : null;
  });

  // Save to localStorage whenever hospitaluser changes
  useEffect(() => {
    if (hospitaluser) {
      localStorage.setItem("hospitalUser", JSON.stringify(hospitaluser));
    } else {
      localStorage.removeItem("hospitalUser"); // Remove if null
    }
  }, [hospitaluser]);

  return (
    <HospitalContext.Provider value={{ hospitaluser, setHospitaluser }}>
      {children}
    </HospitalContext.Provider>
  );
}

export default HospitalContextProvider;
