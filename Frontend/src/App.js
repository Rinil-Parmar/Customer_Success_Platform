import "./App.css";
import Layout from "../src/pages/Layout";
import "monday-ui-react-core/tokens";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import ProjectList from "./pages/ProjectList";
import AuditorDashboard from "./pages/AuditorDashboard";
import Project from "./pages/Project";

function App() {
  return (
    <div className="App">
      {/*Layout has all the components */}
      {/* <Home /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<AuditorDashboard />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/:id" element={<Project />} />
            {/* Add more routes if needed */}
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
