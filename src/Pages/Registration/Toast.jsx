// Toast.js
import React from 'react';

const Toast = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed bottom-5 right-5 px-4 py-2 rounded-lg shadow-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} transition-transform transform ${message ? 'translate-x-0' : 'translate-x-full'} z-50`}
      role="alert"
      style={{ transition: 'transform 0.5s ease-in-out' }}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
