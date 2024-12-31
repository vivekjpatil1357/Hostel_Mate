import React, { useState } from "react";

const ComplaintRow = ({ data }) => {
  const [status, setStatus] = useState(data.complainStatus);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    // You can add an API call here to update the status in the backend
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-200 text-yellow-800"; // Yellow for Pending
      case "In Progress":
        return "bg-blue-200 text-blue-800"; // Blue for In Progress
      case "Resolved":
        return "bg-green-200 text-green-800"; // Green for Resolved
      default:
        return "bg-gray-200 text-gray-800"; // Default gray
    }
  };

  return (
    <div className="flex items-center justify-around bg-white shadow-md rounded-md p-4 border border-gray-300">
      <div className="flex-1 flex items-start justify-center">
        <p className="text-base text-gray-800">{data.complainType}</p>
      </div>

      <div className="flex-1 flex items-start justify-center">
        <p className="text-base text-gray-800">{data.description}</p>
      </div>
      
      <div className="flex-1 flex items-start justify-center">
        <p className="text-base text-gray-800">
          {new Date(data.dateTime).toLocaleDateString()}
        </p>
      </div>

      <div className="flex-1 flex items-start justify-center">
        <p className="text-base text-gray-800">{data.hostelId?data.hostelId.hostelId:"User Not Exist"}</p>
      </div>

      <div className="flex-1 flex items-start justify-center">
        <div className={`flex items-center ${getStatusColor(status)} px-2 py-1 rounded-md`}>
          <p className="text-base">{status}</p>
        </div>
      </div>

      <select
        value={status}
        onChange={handleStatusChange}
        className="flex-1 flex items-start justify-center text-sm bg-gray-100 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        
      </select>
    </div>
  );
};

export default ComplaintRow;
