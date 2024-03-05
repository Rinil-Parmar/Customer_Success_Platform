import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaTachometerAlt,
  FaListAlt,
  FaUserTie,
  FaCog,
  FaPlus,
} from "react-icons/fa";
import ProjectModal from "./ProjectModal"; // assuming you have a ProjectModal component

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1); // to track which step of the modal is currently active
  const [activeLink, setActiveLink] = useState("Projects");

  const openModal = () => {
    setIsModalOpen(true);
    setStep(1); // reset step to 1 when opening the modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleContinue = () => {
    setStep(step + 1);
  };

  return (
    <>
      <div className="bg-gray-200 text-gray-800 py-4 px-2 h-screen w-1/6">
        <div className="flex flex-col justify-between h-full px-6">
          <div>
            <button
              onClick={openModal}
              className="block py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 flex items-center mb-4"
            >
              <FaPlus className="mr-2" /> New Project
            </button>
            <Link
              to="/projects"
              className={`block py-2 flex items-center hover:text-gray-600 ${
                activeLink === "Projects" ? "text-blue-500" : ""
              }`}
              onClick={() => setActiveLink("Projects")}
            >
              <FaListAlt className="mr-2" /> Projects
            </Link>

            <a
              href="#"
              className={`block py-2 flex items-center hover:text-gray-600 ${
                activeLink === "Project Manager" ? "text-blue-500" : ""
              }`}
              onClick={() => setActiveLink("Project Manager")}
            >
              <FaUserTie className="mr-2" /> Project Manager
            </a>
            <a
              href="#"
              className={`block py-2 flex items-center hover:text-gray-600 ${
                activeLink === "Employees" ? "text-blue-500" : ""
              }`}
              onClick={() => setActiveLink("Employees")}
            >
              <FaTachometerAlt className="mr-2" /> Employees
            </a>
            <a
              href="#"
              className={`block py-2 flex items-center hover:text-gray-600 ${
                activeLink === "Settings" ? "text-blue-500" : ""
              }`}
              onClick={() => setActiveLink("Settings")}
            >
              <FaCog className="mr-2" /> Settings
            </a>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ProjectModal
          step={step}
          closeModal={closeModal}
          handleContinue={handleContinue}
        />
      )}
    </>
  );
};

export default Sidebar;
