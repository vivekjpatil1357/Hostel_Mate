import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const AdminDashboardHeader = ({ email }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState()
  const navigate = useNavigate()
  const { uuid } = useParams()
  useEffect(() => {
    const check = () => {
      fetch('http://localhost:5000/getAdminById',
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            uuid
          })
        }
      ).then((data) => data.json())
        .then((user) => {
          console.log(user);
          if (user.status) {
            setUser(user.user)
            return
          }
          else
            navigate('login/admin')

        })
    }
    check()
  }, [])
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Hamburger Menu for small screens */}
        <button
          className="lg:hidden p-2 bg-gray-600 rounded hover:bg-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Hamburger Icon */}
          <div className={`w-6 h-1 bg-white transform transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 h-1 bg-white my-1 transform transition-opacity ${isOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-1 bg-white transform transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
        <div className={`flex flex-1 justify-center space-x-28 ${isOpen ? 'block' : 'hidden'} lg:flex`}>
          <button onClick={() => { navigate(`/dashboard/admin/${uuid}/students_request`) }} className="block lg:inline-block hover:text-gray-400 text-lg lg:text-base">
            Students Requests
          </button>
          <button onClick={() => { navigate(`/dashboard/admin/${uuid}/grievances`) }} className="block lg:inline-block hover:text-gray-400 text-lg lg:text-base">
            Grievances
          </button>
          <button onClick={() => { navigate(`/dashboard/admin/${uuid}/grievance_history`) }} className="block lg:inline-block hover:text-gray-400 text-lg lg:text-base">
            Grievance History
          </button>
          <button onClick={() => { navigate(`/dashboard/admin/${uuid}/grievance_comman`) }} className="block lg:inline-block hover:text-gray-400 text-lg lg:text-base">
            Grievance Commann to All
          </button>
        </div>
        <div>
          <button className="p-1 bg-gray-600 rounded-md" onClick={() => { navigate(`/dashboard/admin/:uuid`) }}>{"Dashboard"}</button>
        </div>

      </div>
    </nav>
  );
};

export default AdminDashboardHeader;
