import React from "react";

const IntroFooter = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        {/* Footer Links */}
        <div className="flex justify-center space-x-8 mb-4">
          <a href="#home" className="hover:text-gray-400">
            Home
          </a>
          <a href="#about" className="hover:text-gray-400">
            About Us
          </a>
          <a href="#contact" className="hover:text-gray-400">
            Contact
          </a>
          <a href="#help" className="hover:text-gray-400">
            Help
          </a>
        </div>

        {/* Footer Text */}
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default IntroFooter;
