import React from 'react'
import { useUserContext } from '../../userContext/UserContextProvider'
import { useNavigate } from 'react-router-dom'
const RequestVerification = () => {

  const [formData, setFormData] = React.useState({
    fullName: '',
    roomNumber: '',
    contactNumber: '',
    hostelId: '',
    hostelIdPhoto: null,
  });

  const [errors, setErrors] = React.useState({});

  const validate = () => {
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
    return false
  };


  const navigate = useNavigate()
  const user = useUserContext().user
  const handleSendRequest = () => {
    alert("request sent to Authority, wait for their confirmation...")
    navigate('/verification/requestPending')
  }
  if (!user) {
    navigate('/login')
  }
  return (
    <div>
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4">
          <h1 className="text-gray-900 font-bold text-2xl">{user.displayName ? user.displayName : ""}</h1>
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