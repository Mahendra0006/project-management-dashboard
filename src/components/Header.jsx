import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <header
      className="text-white p-3 d-flex justify-content-between"
      style={{ backgroundColor: "#6c5ce7" }}
    >
      <h5 className="m-0">Project Dashboard</h5>
      {user && (
        <div>
          <span className="fw-bold text-white me-3">Hello, {user.email}</span>
          <button
            className="btn btn-light btn-sm"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
