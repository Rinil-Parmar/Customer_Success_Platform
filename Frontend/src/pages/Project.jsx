import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Tab,
  TabList,
  TabPanels,
  TabsContext,
  TabPanel,
} from "monday-ui-react-core";
import DisplayProjects from "../components/DisplayProjects";
import ProjectDetails from "../components/ProjectDetails";
// import Budget from "../components/Budget";
import AddProjectOverview from "../components/AddProjectOverview";
import EditScopeStack from "../components/EditScopeStack";
import AuditHistory from "../components/AuditHistory";
import VersionHistory from "../components/VersionHistory";

export default function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/projects/${id}`
        );
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();

    // return () => {
    //   // Cleanup function
    // };
  }, [id]);

  return (
    <div>
      {project ? (
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {project.project_name}
          </h2>
          <br />
          {/* <hr /> */}

          {/* <p className="text-xl font-bold text-gray-900">
            Description: {project.project_desc}
          </p> */}
          {/* Add other project details */}

          <TabsContext>
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Scope & stack</Tab>
              <Tab>Escalation Matixes</Tab>
              <Tab>Audit History</Tab>
              <Tab>Versoin History</Tab>
              <Tab>Stakeholders</Tab>
              <Tab>Risk Profiling</Tab>
              <Tab>Phases</Tab>
              <Tab>Sprint detail</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {/* PROJECT OVERVIEW COMPONENT  */}
                <AddProjectOverview project={project} setFetch={setFetch} />
              </TabPanel>
              <TabPanel>
                {/* SCOPE AND STACK  */}
                <EditScopeStack project={project} setFetch={setFetch} />
              </TabPanel>
              <TabPanel>
                {/* ESCALATION MATRIXES */}
                {/* <Budget project={project} setFetch={setFetch} /> */}
                <DisplayProjects />
              </TabPanel>
              <TabPanel>
                {/* AUDIT HISTORY */}
                <AuditHistory project={project} setFetch={setFetch} />
              </TabPanel>
              <TabPanel>
                {/* VERSION HISTORY */}
                <VersionHistory project={project} setFetch={setFetch} />
              </TabPanel>
            </TabPanels>
          </TabsContext>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
