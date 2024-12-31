import React from "react";

const ConfirmBox = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                <p className="text-lg font-semibold text-gray-800">{message}</p>
                <div className="flex justify-center mt-4 space-x-4">
                    <button
                        onClick={onConfirm}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                        Yes
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmBox;
