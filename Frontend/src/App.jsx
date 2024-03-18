import "./App.css";
import Layout from "./pages/Layout";
import "monday-ui-react-core/tokens";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import ProjectList from "./pages/ProjectList";
import AuditorDashboard from "./pages/AuditorDashboard";
import Project from "./pages/Project";
import ProtectedRoute from "./components/ProtectedRoute";
import UsersList from "./pages/UsersList";
import { UserContextProvider } from "./contexts/UserContext";
import ProjectManager from "./pages/ProjectManager";
import Employee from "./pages/Employees";
import Settings from "./pages/Settings";

function App() {
  return (
    <div className="App">

      {/* <Home /> */}
      <Router>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/" element={<Layout />}>
                <Route path="/dashboard" element={<AuditorDashboard />} />
                <Route path="/projects" element={<ProjectList />} />
                <Route path="/projects/:id" element={<Project />} />
                <Route path="/project_manager" element={<ProjectManager />} />
                <Route path="/users" element={<UsersList />} />
                <Route path="/employee" element={<Employee />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>
          </Routes>
        </UserContextProvider>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
