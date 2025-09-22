import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../features/auth/authApi";
import { clearAuth } from "../features/auth/authSlice";

export default function Header() {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearAuth());
      navigate("/"); // redirect to home
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logo.jpeg" alt="Tricksy Logo" className="h-12 w-auto" />
        </Link>

        {/* Navigation Menu (centered) */}
        <nav className="flex-1 flex justify-center space-x-10 text-lg font-semibold">
          <Link
            to="/"
            className="hover:text-[#5e65ec] transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/#services"
            className="hover:text-[#5e65ec] transition duration-200"
          >
            Services
          </Link>
          <Link
            to="/#about"
            className="hover:text-[#5e65ec] transition duration-200"
          >
            About Us
          </Link>
        </nav>

        {/* Auth buttons / user badge */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="px-3 py-1 bg-[#5e65ec] text-white rounded-full font-medium text-sm">
                {user.name || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-1 bg-gradient-to-r from-[#5e65ec] to-[#4fc3ee] text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-1 bg-gradient-to-r from-[#5e65ec] to-[#4fc3ee] text-white rounded-lg font-semibold hover:opacity-90 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
