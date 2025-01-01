import React, { useEffect, useState } from 'react';
import ConfirmBox from './Dashboard/Admin/ConfirmBox';

const StudentVerificationRow = ({ user,refresh }) => {
    if (!user)
        return <div>No User</div>
    const [showImage, setShowImage] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState(user.verificationStatus);
    const [url, setUrl] = useState()
    const getImg = async () => {
        const url = await (await fetch('http://localhost:5000/getImageUrl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: user.hostelCardPhoto
            })
        })).json()

        setUrl(url.downloadUrl)
        console.log("respoinse", url.downloadUrl);
    }
    useEffect(() => {
        getImg()
        console.log("use effect");

    }, [])
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
        console.log("good");
        console.log(user._id);
        try {
            const updated =await (await fetch('http://localhost:5000/setVerified', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: user._id
                })
            })).json()
            console.log("updated user",updated);
            setShowConfirmBox(false);
            console.log("calling refresh");
            
            refresh()
        } catch (error) {
            alert("problem in verification ")
            console.log("error in updating",error);
            
        }




    };

    const handleCancel = () => {
        console.log("bad");
        setShowConfirmBox(false);
    };
    const getStatusColor = (status) => {
        return status ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800';
    };

    return (
        <div className="grid grid-cols-7  mb-2 items-center bg-white shadow-md rounded-md p-4 border border-gray-300 gap-4">
            <div className="text-center">
                <p className="text-base text-gray-800 font-medium truncate">{user.name}</p>
            </div>


            <div className="text-center">
                <p className="text-base text-gray-800 font-medium truncate">{user.mobileNumber}</p>
            </div>

            <div className="text-center">
                <p className="text-base text-gray-800 font-medium truncate">{user.roomNumber}</p>
            </div>

            <div className="text-center">
                <p className="text-base text-gray-800 font-medium truncate">{user.hostelId}</p>
            </div>

            <div className="text-center">
                <p className="text-base text-gray-800 font-medium truncate">{new Date(user.requestTime).toLocaleDateString()}</p>
            </div>



            <div className="text-center">
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
            </div>

            <div className="text-center">
                <button
                    className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium"
                    onClick={handleImageView}
                >
                    View Photo
                </button>
            </div>

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
        </div>
    );
};

export default StudentVerificationRow;
