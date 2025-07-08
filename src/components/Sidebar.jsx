import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside
      className="sidebar bg-dark text-white p-3"
      style={{ width: "200px", minHeight: "100vh" }}
    >
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `d-block mb-2 fw-bold text-decoration-none ${
            isActive ? "text-warning" : "text-white"
          }`
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          `d-block mb-2 fw-bold text-decoration-none ${
            isActive ? "text-warning" : "text-white"
          }`
        }
      >
        Settings
      </NavLink>
    </aside>
  );
};

export default Sidebar;
