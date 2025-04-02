import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';

function UserContextProvider({ children }) {
  const [userdonner, setUserDonner] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  });

  // Save to localStorage whenever userdonner changes
  useEffect(() => {
    try {
      if (userdonner) {
        localStorage.setItem('user', JSON.stringify(userdonner));
      } else {
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  }, [userdonner]);

  return (
    <UserContext.Provider value={{ userdonner, setUserDonner }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
