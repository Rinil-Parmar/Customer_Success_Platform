import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
const ProjectContext = createContext();

// Custom hook to use project context
export const useProjectContext = () => useContext(ProjectContext);

// Provider component
export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch projects on component mount
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/v1/projects");
      setProjects(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchProjects();
  }, []);

  const addProject = async (project) => {
    try {
      const response = await axios.post("/api/v1/projects", project);
      setProjects([...projects, response.data]);
    } catch (error) {
      setError(error);
    }
  };

  const editProject = async (projectId, updatedProject) => {
    try {
      const response = await axios.put(`/api/v1/projects/${projectId}`, updatedProject);
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
      await axios.delete(`/api/v1/projects/${projectId}`);
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
