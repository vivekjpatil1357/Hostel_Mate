import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../userContext/UserContextProvider'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../config/firebase-config';
import Cookies from 'js-cookie';
import { get } from 'mongoose';

const RequestVerification = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState();


  const [formData, setFormData] = React.useState({
    fullName: '',
    roomNumber: '',
    contactNumber: '',
    hostelId: '',
    hostelIdPhoto: null,
  });



  const suser = useUserContext().setUser
  const c = JSON.parse(Cookies.get('user'))
  const getUser = () => {
    if (c) {
        console.log("email is :", c.email);
        fetch('http://localhost:5000/getUserByEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: c.email })
        }).then((data) => data.json())
          .then((response) => {
            console.log(response);
            if (response.status) {
              setUser(response.user)
            }
          })
    }
    else {
      navigate('/')
    }
  }
  useEffect(() => {
    setTimeout(async () => {
      getUser()
    }, 1000);

  }, [])

  const [errors, setErrors] = React.useState({});

  const validate = () => {
    console.log("validating");
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.roomNumber) newErrors.roomNumber = 'Hostel Room Number is required';
    if (!formData.roomNumber.match(/[0-4]([0-1][0-9]|2[0-4])/)) newErrors.roomNumber = 'Enter Valid Room number';
    if (!formData.contactNumber) newErrors.contactNumber = 'Contact Number is required';
    if (!formData.hostelId) newErrors.hostelId = 'Hostel ID is required';
    if (!formData.hostelIdPhoto) newErrors.hostelIdPhoto = 'Hostel ID Card Photo is required';
    // wrie validatin for file less than 500kb
    if (formData.hostelIdPhoto && formData.hostelIdPhoto.size > 500000) newErrors.hostelIdPhoto = 'File size should be less than 500kb';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleSendRequest();
    }
  };


  const handleSendRequest = async () => {
    alert("request sent to Authority, wait for their confirmation...")
    if (!user) {
      console.log("no user in request verfication");
      return
    }
    try {
      const fd = new FormData();
      fd.append('image', formData.hostelIdPhoto);
      console.log(user);

      const uuid = user._id
      console.log("user id is :", uuid);
      const isValidHostelId = await (await fetch('http://localhost:5000/isValidHostelId', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          hostelId: formData.hostelId
        })
      })).json()
      console.log("is valid hostelId", isValidHostelId);

      if (isValidHostelId.status) {
        setErrors({ hostelId: 'This HostelId is already in Use' })
        return
      }


      const uploadId = await (await fetch(`http://localhost:5000/uploadId/${uuid}`, {
        method: 'post',
        body: fd
      })).json()
      console.log("url is ", uploadId.url);
      
      const storeUserDetails = await (await fetch('http://localhost:5000/storeUserDetailsInDb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: user.email,
          verficationStatus: false,
          roomNumber: formData.roomNumber,
          hostelId: formData.hostelId,
          hostelCardPhoto: uploadId.url,
          mobileNumber: formData.contactNumber,
          requestTime: new Date()
        })
      })).json()
      if (storeUserDetails.status)
        navigate('/verification/requestPending')

    } catch (error) {
      console.log("error in handleSendRequest in request verfication", error);

    }

  }

  return (
    <div>
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4">
          {user && <h1 className="text-gray-900 font-bold text-2xl">{user.displayName ? user.displayName : ""}</h1>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                required
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hostel Room Number</label>
              <input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                pattern="[0-4]([0-1][0-9]|2[0-4])"
                title="Room Number must be a number between 001 and 424"
                required
              />
              {errors.roomNumber && <p className="text-red-500 text-xs mt-1">{errors.roomNumber}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                required
              />
              {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hostel ID</label>
              <input
                type="text"
                name="hostelId"
                value={formData.hostelId}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                required
              />
              {errors.hostelId && <p className="text-red-500 text-xs mt-1">{errors.hostelId}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hostel ID Card Photo (less than 500 kb)</label>
              <input
                type="file"
                name="hostelIdPhoto"
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                required
              />
              {errors.hostelIdPhoto && <p className="text-red-500 text-xs mt-1">{errors.hostelIdPhoto}</p>}
            </div>
            <div>
              <input
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
                value="Send Request for Acceptance"
                onClick={handleSubmit}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RequestVerification