import React, { useContext, useState, useEffect } from "react";
import {
  Tab,
  TabList,
  TabPanels,
  TabsContext,
  TabPanel,
} from "monday-ui-react-core";
import DisplayProjects from "../components/DisplayProjects";
import { UserContext } from "../contexts/UserContext";
import InProgressProjects from "../components/InProgressProjects";
import CompletedProjects from "../components/CompletedProjects";
import OnHoldProjects from "../components/OnHoldProjects";
import axios from "axios";

// AuditorDashboard component
function AuditorDashboard() {
  const [fetch, setFetch] = useState(false);
  const { myUser } = useContext(UserContext);
  const [projects, setProjects] = useState({
    allProjects: [],
    inProgressProjects: [],
    completedProjects: [],
    onHoldProjects: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/projects");
        const allProjects = response.data;
        const inProgressProjects = allProjects.filter(
          (project) => project.project_status === "In progress"
        );
        const completedProjects = allProjects.filter(
          (project) => project.project_status === "Completed"
        );
        const onHoldProjects = allProjects.filter(
          (project) => project.project_status === "On hold"
        );
        setProjects({
          allProjects,
          inProgressProjects,
          completedProjects,
          onHoldProjects,
        });
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, [fetch]);

  if (!myUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      {myUser.role === "admin" ? (
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      ) : myUser.role === "projectmanager" ? (
        <h2 className="text-2xl font-bold">Project Manager Dashboard</h2>
      ) : myUser.role === "client" ? (
        <h2 className="text-2xl font-bold">Client Dashboard</h2>
      ) : (
        <h2 className="text-2xl font-bold">Auditor Dashboard</h2>
      )}

      {/* Cards for different project statuses */}
      <div className="flex justify-around my-8">
        {/* All Projects Card */}
        <div
          className="w-64 bg-blue-500 text-white p-6 rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition duration-300"
          onClick={() => console.log("All Projects clicked")}
        >
          <h3 className="text-xl font-bold mb-2">All Projects</h3>
          <p className="text-lg">{projects.allProjects.length} projects</p>
        </div>

        {/* In Progress Card */}
        <div
          className="w-64 bg-green-500 text-white p-6 rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition duration-300"
          onClick={() => console.log("In Progress clicked")}
        >
          <h3 className="text-xl font-bold mb-2">In Progress</h3>
          <p className="text-lg">
            {projects.inProgressProjects.length} projects
          </p>
        </div>

        {/* Completed Projects Card */}
        <div
          className="w-64 bg-yellow-500 text-white p-6 rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition duration-300"
          onClick={() => console.log("Completed clicked")}
        >
          <h3 className="text-xl font-bold mb-2">Completed</h3>
          <p className="text-lg">
            {projects.completedProjects.length} projects
          </p>
        </div>

        {/* On Hold Projects Card */}
        <div
          className="w-64 bg-red-500 text-white p-6 rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition duration-300"
          onClick={() => console.log("On Hold clicked")}
        >
          <h3 className="text-xl font-bold mb-2">On Hold</h3>
          <p className="text-lg">{projects.onHoldProjects.length} projects</p>
        </div>
      </div>

      <TabsContext>
        <TabList>
          <Tab>All Projects</Tab>
          <Tab>In Progress</Tab>
          <Tab>Completed</Tab>
          <Tab>Hold</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {/* Display project component */}
            <DisplayProjects fetch={fetch} projects={projects.allProjects} />
          </TabPanel>

          <TabPanel>
            {/* In progress projects component */}
            <InProgressProjects fetch={fetch} projects={projects.inProgressProjects} />
          </TabPanel>

          <TabPanel>
            {/* Completed projects component */}
            <CompletedProjects fetch={fetch} projects={projects.completedProjects} />
          </TabPanel>

          <TabPanel>
            {/* On hold projects component */}
            <OnHoldProjects fetch={fetch} projects={projects.onHoldProjects} />
          </TabPanel>
        </TabPanels>
      </TabsContext>
    </div>
  );
}

export default AuditorDashboard;
