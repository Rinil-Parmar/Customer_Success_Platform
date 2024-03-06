import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Layout from "../src/pages/Layout";
import "monday-ui-react-core/tokens";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/AuditorDashboard";
import Modal from "./components/ProjectModal";
import ProjectModal from "./components/ProjectModal";
import { useState } from "react";
import Pdf from "./components/PdfComponent/pdf.jsx";
// import EscalationMatrix from "./pages/EscalationMatrix";

function App() {
  const generatePdf = () => {
    // Send request to Rails backend to generate PDF
    fetch("/generate_pdf", { method: "POST" });
  };

  return (
    <div className="App">
      {/* <Routes>
          <Route exact="true" path="/" element={<Home />}></Route>
        </Routes> */}
      {/* <Home />
      </Layout> */}
      <Layout />
      {/* <ProjectModal /> */}
      {/* <ProjectModal isOpen={isModalOpen} onClose={closeModal} /> */}
      {/* <EscalationMatrix /> */}
      {/* <Pdf/> */}
    </div>
  );
}

export default App;
