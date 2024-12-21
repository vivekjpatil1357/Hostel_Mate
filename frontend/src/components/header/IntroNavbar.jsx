import React, { useState } from "react";

const IntroNavbar = ({ email}) => {
  const [isOpen, setIsOpen] = useState(false);
console.log(email);
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
          <a href="#home" className="block lg:inline-block hover:text-gray-400 text-lg lg:text-base">
            Home
          </a>
          <a href="#about" className="block lg:inline-block hover:text-gray-400 text-lg lg:text-base">
            About Us
          </a>
          <a href="#contact" className="block lg:inline-block hover:text-gray-400 text-lg lg:text-base">
            Contact
          </a>
          <a href="#help" className="block lg:inline-block hover:text-gray-400 text-lg lg:text-base">
            Help
          </a>
        </div>
        <div>
          {email}
        </div>
        {!email?(   
        <div className="flex space-x-4 mt-4 lg:mt-0">
          <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">
            User Login
          </button>
          <button className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600">
            Admin Login
          </button>
        </div>
        ):""}
      </div>
    </nav>
  );
};

export default IntroNavbar;
