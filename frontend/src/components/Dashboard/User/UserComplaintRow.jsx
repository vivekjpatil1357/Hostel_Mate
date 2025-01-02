import React, { useState } from "react";
import ConfirmBox from "../Admin/ConfirmBox";

const UserComplaintRow = ({ data ,refresh}) => {
	const [status, setStatus] = useState(data.complaintStatus);

	const [showConfirmBox, setShowConfirmBox] = useState(false);

	const handleResolved = (e) => {
		setShowConfirmBox(true);
	};
	
	const handleConfirm = async () => {
		setShowConfirmBox(false);
		console.log("refreeshed");
		
		const result = await (await fetch('http://localhost:5000/setComplaintStatus', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: data._id,
				status: 'Resolved',
				resolvedTime: Date.now()
			})
		})).json()
		setStatus(status);
		if (result.status) {
			setStatus("Resolved");
			alert("Status Updated Successfully");
			
			refresh()
		}
		else {
			console.log("problem in updating status");
			
		}
	};

	const handleCancel = () => {
		setShowConfirmBox(false);
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "Pending":
				return "bg-yellow-200 text-yellow-800"; // Yellow for Pending
			case "In Progress":
				return "bg-blue-200 text-blue-800"; // Blue for In Progress
			case "Resolved":
				return "bg-green-200 text-green-800"; // Green for Resolved
			case "Discard":
				return "bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"// Green for Resolved
			default:
				return "bg-gray-200 text-gray-800"; // Default gray
		}
	};

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

				<p
					className="text-base text-gray-800 cursor-pointer"
					
				>
					{data.complaintType}
				</p>
			</div>

			<div className="flex-1 flex items-start justify-center">
				<p className="text-base text-gray-800">
					{new Date(data.dateTime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
				</p>
			</div>

			<div className="flex-1 flex items-start justify-center">
				<div className={`flex items-center ${getStatusColor(status)} px-2 py-1 rounded-md`}>
					<p className="text-base">{status}</p>
				</div>
			</div>

			<button
				onClick={handleResolved}
				className="flex-1 flex items-start justify-center text-sm bg-gray-100 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				Resolved
			</button>
			{showConfirmBox && (
				<ConfirmBox
					message="Are you sure you want to mark this complaint as resolved?"
					onConfirm={handleConfirm}
					onCancel={handleCancel}
				/>
			)}
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
}
export default UserComplaintRow;
