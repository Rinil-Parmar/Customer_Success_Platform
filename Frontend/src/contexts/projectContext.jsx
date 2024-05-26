import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

// Create context
const ProjectContext = createContext();

// Custom hook to use project context
export const useProjectContext = () => useContext(ProjectContext);

// Provider component
export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  // Fetch projects on component mount
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.get("/api/v1/projects", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setProjects(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, [getAccessTokenSilently]);

  const addProject = async (project) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.post("/api/v1/projects", project, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setProjects([...projects, response.data]);
    } catch (error) {
      setError(error);
    }
  };

  const editProject = async (projectId, updatedProject) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.put(`/api/v1/projects/${projectId}`, updatedProject, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const updatedProjects = projects.map(project =>
        project.id === projectId ? response.data : project
      );
      setProjects(updatedProjects);
    } catch (error) {
      setError(error);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      const accessToken = await getAccessTokenSilently();
      await axios.delete(`/api/v1/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const updatedProjects = projects.filter(project => project.id !== projectId);
      setProjects(updatedProjects);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <ProjectContext.Provider value={{ projects, loading, error, addProject, editProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
