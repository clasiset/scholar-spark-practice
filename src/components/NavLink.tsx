
import React from 'react';

const NavLink = ({ text, onClick }) => {
  return (
    <button
      className="text-foreground/80 dark:text-foreground/80 hover:text-secondary dark:hover:text-primary font-medium transition duration-300 ease-in-out py-2 px-3 rounded-md hover:bg-black/5 dark:hover:bg-white/10"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default NavLink;
