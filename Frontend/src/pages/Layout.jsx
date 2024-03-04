// Layout.js
import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./AuditorDashboard";
import ProjectList from "./ProjectList";
import Project from "./Project";
// import About from '../pages/About';

const Layout = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-row flex-1">
          <Sidebar />
          <div className="container mx-auto p-4 flex-1">
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/projects" element={<ProjectList />} />
              <Route path="/projects/:id" element={<Project/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Layout;
