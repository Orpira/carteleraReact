import React from "react";

const Navbar = ({ items, onNavClick }) => (
  <nav className="flex gap-6 justify-center bg-gray-900 text-white py-2 w-full">
    {items &&
      items.map((item) => (
        <button
          key={item.href}
          onClick={() => onNavClick && onNavClick(item.href)}
          className="text-white hover:text-blue-400 transition text-lg"
        >
          {item.label}
        </button>
      ))}
  </nav>
);

export default Navbar;
