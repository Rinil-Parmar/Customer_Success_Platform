import React, { useContext} from "react";
import {
  Tab,
  TabList,
  TabPanels,
  TabsContext,
  TabPanel,
} from "monday-ui-react-core";
import DisplayProjects from "../components/DisplayProjects";
import InProgressProjects from "../components/InProgressProjects";
import CompletedProjects from "../components/CompletedProjects";
import OnHoldProjects from "../components/OnHoldProjects";
import { UserContext } from "../contexts/UserContext";
import { useProjectContext } from "../contexts/projectContext"; // Import the project context hook

function AuditorDashboard() {
  const { myUser } = useContext(UserContext);
  const { projects } = useProjectContext(); // Use the project context hook


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
          <p className="text-lg">{projects.length} projects</p>
        </div>

        {/* In Progress Card */}
        <div
          className="w-64 bg-green-500 text-white p-6 rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition duration-300"
          onClick={() => console.log("In Progress clicked")}
        >
          <h3 className="text-xl font-bold mb-2">In Progress</h3>
          <p className="text-lg">
            {projects.filter(project => project.project_status === "In progress").length} projects
          </p>
        </div>

        {/* Completed Projects Card */}
        <div
          className="w-64 bg-yellow-500 text-white p-6 rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition duration-300"
          onClick={() => console.log("Completed clicked")}
        >
          <h3 className="text-xl font-bold mb-2">Completed</h3>
          <p className="text-lg">
            {projects.filter(project => project.project_status === "Completed").length} projects
          </p>
        </div>

        {/* On Hold Projects Card */}
        <div
          className="w-64 bg-red-500 text-white p-6 rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition duration-300"
          onClick={() => console.log("On Hold clicked")}
        >
          <h3 className="text-xl font-bold mb-2">On Hold</h3>
          <p className="text-lg">
            {projects.filter(project => project.project_status === "On hold").length} projects
          </p>
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
            <DisplayProjects />
          </TabPanel>

          <TabPanel>
            {/* In progress projects component */}
            <InProgressProjects  />
          </TabPanel>

          <TabPanel>
            {/* Completed projects component */}
            <CompletedProjects  />
          </TabPanel>

          <TabPanel>
            {/* On hold projects component */}
            <OnHoldProjects />
          </TabPanel>
        </TabPanels>
      </TabsContext>
    </div>
  );
}

export default AuditorDashboard;
