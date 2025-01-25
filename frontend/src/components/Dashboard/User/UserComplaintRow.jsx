import React, { useState } from "react";
import ConfirmBox from "../Admin/ConfirmBox";
import { useToast } from "@/hooks/use-toast";

const UserComplaintRow = ({ data, refresh }) => {
  const [status, setStatus] = useState(data.complaintStatus);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  // const toast=useToast()
  const handleResolved = () => {
    setShowConfirmBox(true);

  };

  const handleConfirm = async () => {
    setShowConfirmBox(false);
    const result = await (
      await fetch("http://localhost:5000/setComplaintStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data._id,
          status: "Resolved",
          resolvedTime: Date.now(),
        }),
      })
    ).json();

    if (result.status) {
      setStatus("Resolved");
      alert("Status Updated Successfully");
      refresh();
    } else {
      console.log("Problem in updating status");
    }
  
  };

  const handleCancel = () => {
    setShowConfirmBox(false);
  };

  const handleTitleClick = () => {
    setShowDescription(true);
  };

  const handleCloseDescription = () => {
    setShowDescription(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-200 text-yellow-800";
      case "In Progress":
        return "bg-blue-200 text-blue-800";
      case "Resolved":
        return "bg-green-200 text-green-800";
      case "Discard":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <tr className="text-center border-b  border-gray-300">
      <td className="p-4">
        <button
          className="bg-gray-300 rounded-lg p-2 hover:bg-gray-400 cursor-pointer"
          onClick={handleTitleClick}
        >
          {data.complaintType}
        </button>
      </td>
      <td className="p-4">
        {new Date(data.dateTime).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })}
      </td>
      <td className="p-4">
        <div className={`inline-block px-4 py-2 rounded-md ${getStatusColor(status)}`}>
          {status}
        </div>
      </td>
      <td className="p-4">
        <button
          onClick={handleResolved}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Resolved
        </button>
      </td>
      {showConfirmBox && (
        <ConfirmBox
          message="Are you sure you want to mark this complaint as resolved?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      {showDescription && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-1/2">
            <h2 className="text-xl font-bold mb-4">Complaint Description</h2>
            <p className="text-base text-gray-800 mb-6">{data.description}</p>
            <button
              onClick={handleCloseDescription}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </tr>
  );
};

export default UserComplaintRow;
