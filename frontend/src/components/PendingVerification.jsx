import React from 'react'

const PendingVerification = () => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <h1 className="text-gray-900 font-bold text-2xl">Pending Verification</h1>
        <p className="text-gray-600 mt-2">Your request is pending for verification. Please wait for the confirmation.</p>
      </div>
    </div>
  )
}

export default PendingVerification