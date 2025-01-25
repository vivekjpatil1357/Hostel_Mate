import React, { useState } from "react";

const ComplaintRowHistory = ({ data }) => {
    const [status, setStatus] = useState(data.complaintStatus);

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-200 text-yellow-800"; // Yellow for Pending
            case "In Progress":
                return "bg-blue-200 text-blue-800"; // Blue for In Progress
            case "Discard":
                return "bg-red-200 text-red-800"; // Red for Discard
            case "Resolved":
                return "bg-green-200 text-green-800"; // Green for Resolved
            default:
                return "bg-gray-200 text-gray-800"; // Default gray
        }
    };
    return (
        <tr className="border-t border-gray-300">
            <td className="p-4 ">{data.hostelId ? data.hostelId.roomNumber : "User Not Exist"}</td>
            <td className="p-4 w-1/4">{data.hostelId ? data.hostelId.name : "User Not Exist"}</td> {/* Increased width */}
            <td className="p-4 ">{data.complaintType}</td>
            <td className="p-4  w-1/4">
                {new Date(data.dateTime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
            </td> {/* Increased width */}
            <td className="p-4 w-1/4">
                <div className={`inline-block ${getStatusColor(status)} px-4 py-2 rounded-md`}>
                    <p className="text-sm">{status} at {new Date(data.resolvedTime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
                </div>
            </td> {/* Increased width */}
        </tr>
    );
};

export default ComplaintRowHistory;
