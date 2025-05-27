
import React from 'react';

const NavLink = ({ text, onClick }) => {
  return (
    <button
      className="text-gray-700 hover:text-indigo-600 font-medium transition duration-300 ease-in-out py-2 px-3 rounded-md hover:bg-gray-50"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default NavLink;
