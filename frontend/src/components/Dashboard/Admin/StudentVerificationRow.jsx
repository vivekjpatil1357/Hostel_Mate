import React, { useEffect, useState } from 'react';
import ConfirmBox from './ConfirmBox';

const StudentVerificationRow = ({ user, refresh }) => {
  if (!user) return <div>No User</div>;
  const [showImage, setShowImage] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(user.verificationStatus);
  const [url, setUrl] = useState();

  const getImg = async () => {
    const url = await (await fetch('http://localhost:5000/getImageUrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: user.hostelCardPhoto,
      }),
    })).json();

    setUrl(url.downloadUrl);
  };

  useEffect(() => {
    getImg();
  }, []);

  const handleImageView = () => {
    setShowImage(true);
  };

  const closeImageView = () => {
    setShowImage(false);
  };

  const [showConfirmBox, setShowConfirmBox] = useState(false);

  const handleVerification = () => {
    setShowConfirmBox(true);
  };

  const handleConfirm = async () => {
    try {
      const updated = await (await fetch('http://localhost:5000/setVerified', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user._id,
        }),
      })).json();
      setShowConfirmBox(false);
      refresh();
    } catch (error) {
      alert("problem in verification");
    }
  };

  const handleCancel = () => {
    setShowConfirmBox(false);
  };

  const getStatusColor = (status) => {
    return status ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800';
  };

    return (
        <tr className="text-center">
        <td className="p-4">{user.name}</td>
        <td className="p-4">{user.mobileNumber}</td>
        <td className="p-4">{user.roomNumber}</td>
        <td className="p-4">{user.hostelId}</td>
        <td className="p-4">{new Date(user.requestTime).toLocaleDateString()}</td>
       
        <td className="text-center">
        <button
          onClick={handleVerification}
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
        >
          Verify
        </button>
        {showConfirmBox && (
          <ConfirmBox
            message={`Is ${user.name} Verified?`}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
                
      </td>
      <td className="text-center">
        <button
          className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium"
          onClick={handleImageView}
        >
          View Photo
        </button>
      </td>

      {showImage && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg relative max-w-sm">
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              onClick={closeImageView}
            >
              &times;
            </button>
            <img
              src={url}
              alt="Hostel Card"
              className="w-full h-auto object-cover border border-gray-300 rounded"
            />
          </div>
        </div>
      )}
      </tr>
    // <div className="grid grid-cols-7 gap-4 bg-white shadow-md rounded-md p-4 border border-gray-300 mb-4 min-w-full">
    //   <div className="text-center">{user.name}</div>
    //   <div className="text-center">{user.mobileNumber}</div>
    //   <div className="text-center">{user.roomNumber}</div>
    //   <div className="text-center">{user.hostelId}</div>
    //   <div className="text-center">{new Date(user.requestTime).toLocaleDateString()}</div>
    //   <div className="text-center">
    //     <button
    //       onClick={handleVerification}
    //       className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
    //     >
    //       Verify
    //     </button>
    //     {showConfirmBox && (
    //       <ConfirmBox
    //         message={`Is ${user.name} Verified?`}
    //         onConfirm={handleConfirm}
    //         onCancel={handleCancel}
    //       />
    //     )}
    //   </div>
    //   <div className="text-center">
    //     <button
    //       className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium"
    //       onClick={handleImageView}
    //     >
    //       View Photo
    //     </button>
    //   </div>

    //   {showImage && (
    //     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
    //       <div className="bg-white p-4 rounded shadow-lg relative max-w-sm">
    //         <button
    //           className="absolute top-2 right-2 text-red-500 hover:text-red-700"
    //           onClick={closeImageView}
    //         >
    //           &times;
    //         </button>
    //         <img
    //           src={url}
    //           alt="Hostel Card"
    //           className="w-full h-auto object-cover border border-gray-300 rounded"
    //         />
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
};

export default StudentVerificationRow;
