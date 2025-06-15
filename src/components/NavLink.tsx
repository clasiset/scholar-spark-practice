
import React from 'react';

const NavLink = ({ text, onClick }) => {
  return (
    <button
      className="text-foreground/80 hover:text-link font-medium transition duration-300 ease-in-out py-2 px-3 rounded-md hover:bg-muted/50"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default NavLink;
