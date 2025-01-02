import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StudentVerificationRow from './StudentVerificationRow';

const PendingStudents = () => {
  const { uuid } = useParams();
  const [admin, setAdmin] = useState();
  const [users, setUsers] = useState([]);

  const isAdmin = () => {
    fetch('http://localhost:5000/getAdminById', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uuid,
      }),
    })
      .then((d) => d.json())
      .then((admin) => {
        if (admin.status) {
          setAdmin(admin.admin);
        } else {
          console.log("admin not found");
          navigate('/login/admin');
        }
      });
  };

  const getUsers = () => {
    fetch('http://localhost:5000/getAllUserDetails')
      .then((data) => data.json())
      .then((users) => {
        setUsers(users.users.filter((item) => item.verificationStatus === false));
      });
  };

  useEffect(() => {
    isAdmin();
    getUsers();
  }, []);

  const refresh = () => {
    getUsers();
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto bg-white shadow-md rounded-md p-4 border border-gray-300">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-center font-semibold text-gray-800">
              <th className="p-4">Name</th>
              <th className="p-4">Mobile Number</th>
              <th className="p-4">Room Number</th>
              <th className="p-4">Hostel ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((item) => (
              <StudentVerificationRow key={item._id} user={item} refresh={refresh} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingStudents;
