import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../features/auth/authApi"; 
const PALETTE = {
  primary: "#4fc3ee",
  accent: "#5e65ec",
  textLight: "#514a7a",
  bgLight: "rgba(255, 255, 255, 0.7)",
  borderLight: "#b6bfff40",
};

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(useLogoutMutation());
    navigate("/login");
  };

  return (
    <header
      style={{
        backgroundColor: PALETTE.bgLight,
        borderBottom: `1px solid ${PALETTE.borderLight}`,
        backdropFilter: "saturate(180%) blur(10px)",
      }}
      className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-3 z-50 shadow-sm"
    >
      <Link to="/dashboard" aria-label="Tricksy Home" className="flex items-center">
        <img src="public/logo.jpeg" alt="Tricksy Logo" className="h-15 w-30" />
      </Link>

      <nav
        className="space-x-6 text-base font-semibold"
        style={{ color: PALETTE.textLight }}
      >
        <Link to="/services" className="hover:text-[#5e65ec] transition">
          Services
        </Link>
        <Link to="/booking" className="hover:text-[#4fc3ee] transition">
          Book Now
        </Link>

        {user ? (
          <>
            <span className="mx-3">Hi, {user.name || user.email}</span>
            <button
              onClick={handleLogout}
              className="text-[#5e65ec] hover:text-[#4fc3ee] transition ml-2"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:text-[#5e65ec] transition">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
