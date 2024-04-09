import React from "react";

import { Link } from "react-router-dom";
import { useProjectContext } from "../contexts/projectContext";

export default function ProjectList() {
  const { projects } = useProjectContext();

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Project name
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr className="bg-white border-b hover:bg-gray-50" key={project.id}>
              <Link to={`/projects/${project.id}`} className="text-blue-600">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {project.project_name}
                </td>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
