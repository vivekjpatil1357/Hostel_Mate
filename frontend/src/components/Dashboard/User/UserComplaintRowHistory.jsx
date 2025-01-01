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
  return (
    <div className="flex items-center justify-around bg-white shadow-md rounded-md p-4 border border-gray-300">
   
     
      <div className="flex-1 flex items-start justify-center">
        <p className="text-base text-gray-800">{data.complaintType}</p>
      </div>
      <div className="flex-1 flex items-start justify-center">
        <p className="text-base text-gray-800">
          {new Date(data.dateTime).toLocaleDateString()}
        </p>
      </div>
      <div className="flex-1 flex items-start justify-center">
        <div className={`flex items-center ${getStatusColor(status)} px-2 py-1 rounded-md`}>
          <p className="text-base">{status} at { new Date(data.resolvedTime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
        </div>
      </div>
    </div>
  );
};
export default UserComplaintRowHistory;
