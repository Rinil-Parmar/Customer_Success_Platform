import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaListAlt,
  FaUserTie,
  FaCog,
  FaPlus,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <>
      <div className="bg-gray-200 text-gray-800 py-4 px-2 h-screen w-1/6">
        <div className="flex flex-col justify-between h-full px-6">
          <div>
            
            <button className="block py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 flex items-center mb-4">
              <FaPlus className="mr-2" /> New Project
            </button>
            <a
              href="#"
              className="block py-2 flex items-center hover:text-gray-600"
            >
              <FaListAlt className="mr-2" /> Projects
            </a>
            <a
              href="#"
              className="block py-2 flex items-center hover:text-gray-600"
            >
              <FaUserTie className="mr-2" /> Project Manager
            </a>
            <a
              href="#"
              className="block py-2 flex items-center hover:text-gray-600"
            >
              <FaTachometerAlt className="mr-2" /> Employees
            </a>
            <a
              href="#"
              className="block py-2 flex items-center hover:text-gray-600"
            >
              <FaCog className="mr-2" /> Settings
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
