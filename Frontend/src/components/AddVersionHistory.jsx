import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddVersionHistory({ project, setFetch, closeModal }) {
  const [versionNo, setVersionNo] = useState("");
  const [versionType, setVersionType] = useState("");
  const [change, setChange] = useState("");
  const [reason, setReason] = useState(""); // Include reason state
  const [createdBy, setCreatedBy] = useState("");
  const [revisionDate, setRevisionDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newVersion = {
      version_no: versionNo,
      version_type: versionType,
      change,
      reason, // Include reason in the new version object
      created_by: createdBy,
      revision_date: revisionDate,
      project_id: project.id
    };

    try {
      await axios.post(`http://localhost:3000/api/v1/projects/${project.id}/version_histories`, newVersion);
      toast.success("Version history added successfully.");
      setFetch((prev) => !prev);
      closeModal();
    } catch (error) {
      console.error("Error adding version history:", error);
      toast.error("An error occurred while adding the version history.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Add Version History</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Version No:</label>
            <input type="text" value={versionNo} onChange={(e) => setVersionNo(e.target.value)} className="border rounded-md px-2 py-1 ml-2" />
          </div>
          <div className="mb-4">
            <label>Version Type:</label>
            <input type="text" value={versionType} onChange={(e) => setVersionType(e.target.value)} className="border rounded-md px-2 py-1 ml-2" />
          </div>
          <div className="mb-4">
            <label>Change:</label>
            <input type="text" value={change} onChange={(e) => setChange(e.target.value)} className="border rounded-md px-2 py-1 ml-2" />
          </div>
          <div className="mb-4">
            <label>Reason:</label> {/* Add reason input field */}
            <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} className="border rounded-md px-2 py-1 ml-2" />
          </div>
          <div className="mb-4">
            <label>Created By:</label>
            <input type="text" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} className="border rounded-md px-2 py-1 ml-2" />
          </div>
          <div className="mb-4">
            <label>Revision Date:</label>
            <input type="date" value={revisionDate} onChange={(e) => setRevisionDate(e.target.value)} className="border rounded-md px-2 py-1 ml-2" />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2">Add</button>
            <button onClick={closeModal} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddVersionHistory;
