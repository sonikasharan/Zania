import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-start">
        <h1 className="text-xl font-normal text-gray-800">
          Zania Card Management
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
