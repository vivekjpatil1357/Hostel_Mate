import React, { useState } from 'react';
import ConfirmBox from './ConfirmBox';

const ComplaintRow = ({ data, refresh }) => {
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
    const result = await (await fetch('http://localhost:5000/setComplaintStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: data._id,
        status,
        resolvedTime: Date.now()
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
        return "bg-yellow-200 text-yellow-800";
      case "In Progress":
        return "bg-blue-200 text-blue-800";
      case "Discard":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <tr className="text-center">
      <td className="p-4">{data.hostelId ? data.hostelId.roomNumber : "User Not Exist"}</td>
      <td className="p-4">{data.hostelId ? data.hostelId.name : "User Not Exist"}</td>
      <td className="p-4">{data.complaintType}</td>
      <td className="p-4">{new Date(data.dateTime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
      <td className="p-4">
        <div className={`flex items-center ${getStatusColor(status)} px-4 py-2 rounded-md`}>
          <p className="text-base">{status}</p>
        </div>
      </td>
      <td className="p-4">
        <select
          value={status}
          onChange={handleStatusChange}
          className="bg-gray-100 text-sm border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Discard">Discard</option>
        </select>
      </td>
      {showConfirmBox && (
        <ConfirmBox
          message={status === 'Discard' ? `Do You Really want to Discard? (Note: You can't change status after discarded)` : `${status} ?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </tr>
  );
};

export default ComplaintRow;
