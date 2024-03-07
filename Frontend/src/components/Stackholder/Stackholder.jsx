import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import toast
import "react-toastify/dist/ReactToastify.css";
import EditStakeholder from "./EditStakeholder";
import AddStakeholder from "./AddStakeholder";

function Stakeholder({ project, setFetch }) {
  const [stakeholders, setStakeholders] = useState([]);
  const [selectedStakeholder, setSelectedStakeholder] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchStakeholders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/projects/${project.id}/stakeholders`
        );
        setStakeholders(response.data);
      } catch (error) {
        console.error("Error fetching stakeholders:", error);
      }
    };

    fetchStakeholders();

    // Set interval to fetch stakeholders every minute
    const intervalId = setInterval(fetchStakeholders, 6000);

    // Cleanup function
    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, [project, setFetch]);

  const handleEdit = (stakeholder) => {
    setSelectedStakeholder(stakeholder);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Do you want to delete this stakeholder?");
    if (confirmed) {
      try {
        await axios.delete(
          `http://localhost:3000/api/v1/projects/${project.id}/stakeholders/${id}`
        );
        toast.success("Stakeholder deleted successfully.");
        setFetch((prevFetch) => !prevFetch);
      } catch (error) {
        console.error("Error deleting stakeholder:", error);
        toast.error("An error occurred while deleting the stakeholder.");
      }
    }
  };

  const handleSendEmail = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/v1/projects/${project.id}/email_update/send_audit_history_email`
      );
      toast.success("Email sent successfully.");
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("An error occurred while sending the email.");
    }
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg relative">
      {/* Add Send Email button */}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 absolute top-4 right-4 z-50"
        onClick={handleSendEmail}
      >
        Send Email
      </button>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-12">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Contact(Email)
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {stakeholders.map((stakeholder) => (
            <tr
              className="bg-white border-b hover:bg-gray-50"
              key={stakeholder.id}
            >
              <td className="px-6 py-4">{stakeholder.title}</td>
              <td className="px-6 py-4">{stakeholder.name}</td>
              <td className="px-6 py-4">{stakeholder.contact}</td>
              <td className="px-6 py-4 text-right flex gap-2">
                <button
                  className="text-blue-600"
                  onClick={() => handleEdit(stakeholder)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(stakeholder.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals */}
      {/* Edit Modal */}
      {selectedStakeholder && (
        <EditStakeholder
          stakeholder={selectedStakeholder}
          setFetch={setFetch}
          closeModal={() => setSelectedStakeholder(null)}
        />
      )}

      {/* Add Modal */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
        onClick={() => setAddModalOpen(true)}
      >
        Add Stakeholder
      </button>
      {addModalOpen && (
        <AddStakeholder
          project={project}
          setFetch={setFetch}
          closeModal={() => setAddModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Stakeholder;
