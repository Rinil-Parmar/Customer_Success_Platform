import React from "react";
import logo from "../assets/CS.png";
// import Dp from "../assets/dp.png";
import { Link } from "react-router-dom";
import { Avatar } from "monday-ui-react-core";
const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg p-4 flex justify-between items-center">
      {/* Logo and Site Name */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="w-12 h-12 mr-2" />
          <span className="text-gray-800 font-bold text-l">
            Customer <br />
            Support
          </span>
        </Link>
      </div>
      {/* Search Bar */}
      <div className="flex items-center bg-gray-200 rounded-full px-4 py-2">
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent focus:outline-none text-gray-800 w-64"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-800 ml-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        ></svg>
        {/* Search Button */}
        <button className="flex items-center bg-gray-300 rounded-full px-2 py-2 hover:bg-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-800"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>
      {/* User Profile */}
      <div className="flex items-center">
        {/* <img src={Dp} alt="User" className="w-10 h-10 rounded-full" /> */}
        <Avatar
          ariaLabel="Hadas Fahri"
          size="large"
          src="https://style.monday.com/static/media/person1.de30c8ee.png"
          type="img"
        />

        <div className="ml-3">
          <span className="text-gray-800 font-medium">John Doe</span>
          <br />
          <span className="text-gray-600 text-sm">Admin</span>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
