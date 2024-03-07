import React, { useState } from "react";
import {
  Tab,
  TabList,
  TabPanels,
  TabsContext,
  TabPanel,
} from "monday-ui-react-core";
import DisplayProjects from "../components/DisplayProjects";

// AuditorDashboard component
function AuditorDashboard() {
  const [fetch, setFetch] = useState(false);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold">Auditor Dashboard</h2>

      <TabsContext>
        <TabList>
          <Tab>All Projects</Tab>
          <Tab>In progress</Tab>
          <Tab>Completed</Tab>
          <Tab>Hold</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {/* Display ptoject component  */}
            <DisplayProjects fetch={fetch} setFetch={setFetch} />
          </TabPanel>
        </TabPanels>
      </TabsContext>
    </div>
  );
}

export default AuditorDashboard;
