import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow mb-6">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="text-2xl font-bold tracking-tight">E-Commerce</div>
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-blue-200 transition-colors ${isActive ? 'underline' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `hover:text-blue-200 transition-colors ${isActive ? 'underline' : ''}`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/infinite"
            className={({ isActive }) =>
              `hover:text-blue-200 transition-colors ${isActive ? 'underline' : ''}`
            }
          >
            Infinite
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
