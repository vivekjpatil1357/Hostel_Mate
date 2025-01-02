import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ComplaintRow from './ComplaintRow'

const Grievances = () => {
  const [complaints, setComplaints] = useState([]);
  const { uuid } = useParams();
  const [admin, setAdmin] = useState();
  const navigate = useNavigate();

  async function fetchGrievances() {
    await fetch('http://localhost:5000/getAllGrievances')
      .then((d) => d.json())
      .then((complaints) => {
        console.log(complaints);
        setComplaints(complaints.complaints.filter((complaint) => {
          return complaint.complaintStatus !== 'Discard' && complaint.complaintStatus !== 'Resolved';
        }))
      }).catch((error) => {
        console.log(error);
      })
  }

  const isAdmin = () => {
    fetch('http://localhost:5000/getAdminById', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uuid
      })
    }).then((d) => d.json())
      .then((admin) => {
        if (admin.status) {
          setAdmin(admin.admin);
        } else {
          console.log("admin not found");
          navigate('/login/admin');
        }
      })
  }

  useEffect(() => {
    fetchGrievances();
    isAdmin();
  }, []);

  const refresh = () => {
    fetchGrievances();
  }

  return (
    <div className="p-4">
      <div className="overflow-x-auto bg-white shadow-md rounded-md p-4 border border-gray-300">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-center font-semibold text-gray-800">
              <th className="p-4">Room Number</th>
              <th className="p-4">Name</th>
              <th className="p-4">Type</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Change Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints?.map((item) => (
              <ComplaintRow key={item._id} data={item} refresh={refresh} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Grievances;
