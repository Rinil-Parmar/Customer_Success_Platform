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

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateProjectClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
    </div>
  );
}

export default App;
