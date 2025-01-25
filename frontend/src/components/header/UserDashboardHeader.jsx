import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
const UserDashboardHeader = ({ email }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { uuid } = useParams();

  useEffect(() => {
    const c = JSON.parse(Cookies.get('user'));
    if (c) {
      setUser(c);
      console.log("User found");
    } else {
      console.log("User not found");
    }
  }, []);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Hamburger Menu for small screens */}
        <button
          className="lg:hidden p-2 bg-gray-600 rounded hover:bg-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Hamburger Icon */}
          <div
            className={`w-6 h-1 bg-white transform transition-transform ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          ></div>
          <div
            className={`w-6 h-1 bg-white my-1 transform transition-opacity ${
              isOpen ? 'opacity-0' : ''
            }`}
          ></div>
          <div
            className={`w-6 h-1 bg-white transform transition-transform ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          ></div>
        </button>

        {/* Navigation Links */}
        {user && (
          <div
            className={`flex flex-col lg:flex-row flex-1 justify-center space-y-4 lg:space-y-0 lg:space-x-8 ${
              isOpen ? 'block' : 'hidden'
            } lg:flex`}
          >
            <NavLink
              to={`/dashboard/user/${user._id}/add_grievance`}
              className={({ isActive }) =>
                isActive
                  ? 'text-gray-400 border-b-2 border-white'
                  : 'hover:text-gray-400'
              }
            >
              Add Grievance
            </NavLink>
            <NavLink
              to={`/dashboard/user/${user._id}/grievances`}
              className={({ isActive }) =>
                isActive
                  ? 'text-gray-400 border-b-2 border-white'
                  : 'hover:text-gray-400'
              }
            >
              Grievances
            </NavLink>
            <NavLink
              to={`/dashboard/user/${user._id}/grievance_history`}
              className={({ isActive }) =>
                isActive
                  ? 'text-gray-400 border-b-2 border-white'
                  : 'hover:text-gray-400'
              }
            >
              Grievance History
            </NavLink>
            <NavLink
              to={`/dashboard/user/${user._id}/hostel_voice`}
              className={({ isActive }) =>
                isActive
                  ? 'text-gray-400 border-b-2 border-white'
                  : 'hover:text-gray-400'}
            >
              Hostel's Voice
            </NavLink>
          </div>
        )}

        {/* Dashboard Button */}
        <div>
          <button
            className="p-1 bg-gray-600 rounded-md"
            onClick={() => {
              navigate(`/dashboard/user/${uuid}`);
            }}
          >
            {/* <Button>Hello world</Button> */}
           {user?.name.split(" ")[0]}'s Profile 
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserDashboardHeader;
