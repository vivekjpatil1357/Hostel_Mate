import React, { useEffect, useState } from "react";
import ConfirmBox from "../Admin/ConfirmBox";

const UserComplaintRowHistory = ({ data }) => {
  const [status, setStatus] = useState(data.complaintStatus);
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-200 text-yellow-800"; // Yellow for Pending
      case "In Progress":
        return "bg-blue-200 text-blue-800"; // Blue for In Progress
      case "Discard":
        return "bg-red-200 text-red-800"; // Green for Resolved
      case "Resolved":
        return "bg-green-200 text-green-800"; // Green for Resolved
      default:
        return "bg-gray-200 text-gray-800"; // Default gray
    }
  }
  const [showDescription, setShowDescription] = useState(false);

  const handleTitleClick = () => {
    setShowDescription(true);
  };

  const handleCloseDescription = () => {
    setShowDescription(false);
  };

  return (
    <tr className="text-center border-b border-gray-300">
      <td className="p-4">
        <button
          className="text-gray-800 font-medium bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded transition-all duration-200 cursor-pointer"
          onClick={handleTitleClick}
        >
          {data.complaintType}
        </button>
      </td>
      <td className="p-4 text-gray-700">
        {new Date(data.dateTime).toLocaleDateString()}
      </td>
      <td  className="">
        <div
          className={`inline-block text-sm font-medium px-4 py-2 rounded-full ${getStatusColor(
            status
          )}`}
        >
          {status} at{" "}
          {new Date(data.resolvedTime).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })}
        </div>
      </td>
      {showDescription && (
        <td colSpan="4" className="p-4">
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md w-1/2">
              <h2 className="text-xl font-bold mb-4">Complaint Description</h2>
              <p className="text-gray-700 mb-6">{data.description}</p>
              <button
                onClick={handleCloseDescription}
                className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </td>
      )}
    </tr>

  );
};
export default UserComplaintRowHistory;
