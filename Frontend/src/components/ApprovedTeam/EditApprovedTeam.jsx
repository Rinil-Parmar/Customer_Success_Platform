import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function EditApprovedTeam({ teamMember, setFetch, closeModal }) {
  const [numberOfResources, setNumberOfResources] = useState(teamMember.number_of_resources);
  const [role, setRole] = useState(teamMember.role);
  const [availabilityPercentage, setAvailabilityPercentage] = useState(teamMember.availability_percentage);
  const [duration, setDuration] = useState(teamMember.duration);

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTeamMember = {
      number_of_resources: numberOfResources,
      role,
      availability_percentage: availabilityPercentage,
      duration,
    };

    try {
      await axios.put(
        `/api/v1/projects/${id}/approved_teams/${teamMember.id}`,
        updatedTeamMember
      );
      toast.success("Approved team member updated successfully.");
      setFetch((prev) => !prev);
      closeModal();
    } catch (error) {
      console.error("Error updating approved team member:", error);
      toast.error("An error occurred while updating the approved team member.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-200 p-8 rounded-md shadow-lg">
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-lg font-semibold mb-4">Edit Approved Team Member</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Number of Resources:</label>
            <input
              type="number"
              value={numberOfResources}
              onChange={(e) => setNumberOfResources(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Role:</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Availability Percentage:</label>
            <input
              type="number"
              value={availabilityPercentage}
              onChange={(e) => setAvailabilityPercentage(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Duration:</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
            >
              Save
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditApprovedTeam;
