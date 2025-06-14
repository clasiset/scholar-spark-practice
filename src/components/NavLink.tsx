
import React from 'react';

const NavLink = ({ text, onClick }) => {
  return (
    <button
      className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-sky-400 font-medium transition duration-300 ease-in-out py-2 px-3 rounded-md hover:bg-gray-50 dark:hover:bg-slate-800"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default NavLink;
