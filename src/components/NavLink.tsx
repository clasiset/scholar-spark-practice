
import React from 'react';

const NavLink = ({ text, onClick }) => {
  return (
    <button
      className="text-brand-blue-foreground/80 dark:text-gray-300 hover:text-secondary dark:hover:text-sky-400 font-medium transition duration-300 ease-in-out py-2 px-3 rounded-md"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default NavLink;
