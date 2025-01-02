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
    <div className="flex items-center justify-around bg-white shadow-md rounded-md p-4 border border-gray-300">
   
     
   <div className="flex-1 flex items-start justify-center border border-transparent bg-gray-300 rounded-lg p-2 hover:bg-gray-400 cursor-pointer " onClick={handleTitleClick} >
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
      {showDescription && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-4 rounded-md shadow-md w-1/2">
						<h2 className="text-xl font-bold mb-2">Complaint Description</h2>
						<p className="text-base text-gray-800 mb-4">{data.description}</p>
						<button
							onClick={handleCloseDescription}
							className="bg-blue-500 text-white px-4 py-2 rounded"
						>
							Close
						</button>
					</div>
				</div>
			)}
    </div>
  );
};
export default UserComplaintRowHistory;
