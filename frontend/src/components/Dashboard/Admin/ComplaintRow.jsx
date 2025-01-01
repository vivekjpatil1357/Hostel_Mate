import React, { useState } from "react";
import ConfirmBox from "./ConfirmBox";

const ComplaintRow = ({ data,refresh }) => {
  const [status, setStatus] = useState(data.complaintStatus);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [prevStatus, setPrevStatus] = useState(data.complaintStatus);
  const handleStatusChange = (e) => {
    setPrevStatus(status);
    setStatus(e.target.value);
    setShowConfirmBox(true);
  };

  const handleConfirm = async () => {
    setShowConfirmBox(false);
    console.log("good");
    const result = await (await fetch('http://localhost:5000/setComplaintStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: data._id,
        status
      })
    })).json()
    setStatus(status);
    if (result.status) {
      alert("Status Updated Successfully");
    }
    if (status === 'Discard') {
      refresh()
    }
  };
  const handleCancel = () => {
    setStatus(prevStatus);
    setShowConfirmBox(false);
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-200 text-yellow-800"; // Yellow for Pending
      case "In Progress":
        return "bg-blue-200 text-blue-800"; // Blue for In Progress
      case "Discard":
        return "bg-red-200 text-red-800"; // Green for Resolved
      default:
        return "bg-gray-200 text-gray-800"; // Default gray
    }
  };

  return (
    <div className="flex items-center justify-around bg-white shadow-md rounded-md p-4 border border-gray-300">
      <div className="flex-1 flex items-start justify-center">
        <p className="text-base text-gray-800">{data.hostelId ? data.hostelId.roomNumber : "User Not Exist"}</p>
      </div>
      <div className="flex-1 flex items-start justify-center">
        <p className="text-base text-gray-800">{data.hostelId ? data.hostelId.name : "User Not Exist"}</p>
      </div>
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
        <option value="Discard">Discard</option>

      </select>
      {showConfirmBox
        &&
        (status === 'Discard'
          &&
          (<ConfirmBox
            message={`Do You Really want to Discard?
            (Note: You can't change status after discarded)`}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
          )
          || <ConfirmBox
            message={`${status} ?`}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )
      }
    </div>
  );
};

export default ComplaintRow;
