import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function EditStakeholder({ stakeholder, setFetch, closeModal }) {
  const [title, setTitle] = useState(stakeholder.title);
  const [name, setName] = useState(stakeholder.name);
  const [contact, setContact] = useState(stakeholder.contact);
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedStakeholder = {
      title,
      name,
      contact,
    };

    try {
      await axios.put(
        `http://localhost:3000/api/v1/projects/${id}/stakeholders/${stakeholder.id}`,
        updatedStakeholder
      );
      toast.success("Stakeholder updated successfully.");
      setFetch((prev) => !prev);
      closeModal();
    } catch (error) {
      console.error("Error updating stakeholder:", error);
      toast.error("An error occurred while updating the stakeholder.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-md">
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
        <h2 className="text-lg font-semibold mb-4">Edit Stakeholder</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Contact:</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
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

export default EditStakeholder;