import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProject from "./EditProject";
import { UserContext } from "../contexts/UserContext";
import { useProjectContext } from "../contexts/projectContext";

function InProgressProjects({ }) {
  const { projects, deleteProject } = useProjectContext(); // Using the project context
  const [selectedProject, setSelectedProject] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { myUser } = useContext(UserContext);

  // useEffect(() => {
  //   fetchData(); // Fetch data initially
  // }, []);

  const inProgressProjects = projects.filter(
    (project) => project.project_status === "In progress"
  );


  const handleDelete = async (id) => {
    const confirmed = window.confirm("Do you want to delete?");

    if (confirmed) {
      try {
        await deleteProject(id);
        toast.success("Project deleted successfully");
        // fetchData(); // Fetch updated data after deletion
      } catch (error) {
        toast.error("Error deleting project");
        console.log(error);
      }
    }
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setEditModalOpen(true); // Open the edit modal
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setEditModalOpen(false); // Close the edit modal
  };

  const canEditAndDelete =
    myUser && (myUser.role === "admin" || myUser.role === "auditor");

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        {/* Table header */}
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Project name
            </th>
            <th scope="col" className="px-6 py-3">
              Stack
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Project manager
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {inProgressProjects.length > 0 &&
            inProgressProjects.map((project) => (
              <tr
                className="bg-white border-b hover:bg-gray-50"
                key={project.id}
              >
                {/* Table row cells */}
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {project.project_name}
                </td>
                <td className="px-6 py-4">{project.project_stack}</td>
                <td className="px-6 py-4">{project.project_status}</td>
                <td className="px-6 py-4">{project.project_manager}</td>
                {/* Edit and delete buttons */}
                {canEditAndDelete && (
                  <td className="px-6 py-4 text-right flex gap-2">
                    <button
                      className="text-blue-600"
                      onClick={() => handleEdit(project)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(project.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>

      {/* Edit modal */}
      {selectedProject && (
        <EditProject
          project={selectedProject}
          closeModal={handleCloseModal}
        />
      )}
    </div>
  );
}

export default InProgressProjects;
