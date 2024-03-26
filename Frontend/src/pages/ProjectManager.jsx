import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EditUser from "../components/EditUser";

const ProjectManager = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/users");
        const projectManagerUsers = response.data.filter(
          (user) => user.role === "projectmanager"
        );
        setUsers(projectManagerUsers);
      } catch (error) {
        toast.error("Error fetching project managers");
        console.error("Error fetching project managers:", error);
      }
    };

    fetchUsers();

    const intervalId = setInterval(fetchUsers, 6000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Project Managers</h1>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="bg-white border-b hover:bg-gray-50" key={user.id}>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectManager;
