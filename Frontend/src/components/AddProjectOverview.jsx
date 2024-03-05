import React, { useState } from "react";
import axios from "axios";

const AddProjectOverview = ({ project, setFetch }) => {
  const [overview, setOverview] = useState("");
  const [purpose, setPurpose] = useState("");
  const [goals, setGoals] = useState("");
  const [objectives, setObjectives] = useState("");
  const [budget, setBudget] = useState("");
  const [submitted, setSubmitted] = useState(false); // State for confirmation message

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure budget is not negative
    if (budget < 0) {
      console.error("Budget cannot be negative");
      return;
    }

    const data = {
      project_id: project.id,
      project_overview: overview,
      purpose,
      goals,
      objectives,
      budget,
    };

    try {
      console.log("Submitting data:", data);
      await axios.post("http://localhost:3000/api/v1/overviews", data);
      console.log("Data submitted successfully");
      setFetch((prevFetch) => !prevFetch);
      setSubmitted(true); // Show confirmation message
      // Reset form fields
      setOverview("");
      setPurpose("");
      setGoals("");
      setObjectives("");
      setBudget("");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {submitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            Project Overview added successfully.
            <span
              className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
              onClick={() => setSubmitted(false)}
            >
              &times;
            </span>
          </div>
        )}
        <div>
          <label htmlFor="overview" className="block mb-1 font-medium">
            Project Overview
          </label>
          <textarea
            id="overview"
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            rows="4"
            placeholder="Enter project overview"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="purpose" className="block mb-1 font-medium">
            Purpose
          </label>
          <textarea
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            rows="4"
            placeholder="Enter purpose"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="goals" className="block mb-1 font-medium">
            Goals
          </label>
          <textarea
            id="goals"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            rows="4"
            placeholder="Enter goals"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="objectives" className="block mb-1 font-medium">
            Objectives
          </label>
          <textarea
            id="objectives"
            value={objectives}
            onChange={(e) => setObjectives(e.target.value)}
            rows="4"
            placeholder="Enter objectives"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="budget" className="block mb-1 font-medium">
            Budget (USD)
          </label>
          <input
            id="budget"
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            min="0" // Ensure budget is not negative
            placeholder="Enter budget in USD"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProjectOverview;
