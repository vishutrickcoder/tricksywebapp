import { useState } from "react";
import { useLoginMutation } from "../features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

// Custom blue-violet color palette from Tricksy logo
const PALETTE = {
  primary: "#4fc3ee",      // main blue (logo's "Trick")
  accent: "#5e65ec",       // strong violet (logo's "ksy")
  bgLight: "#def7fb",      // aqua light
  bgDeep: "#bbb6fa",       // lighter violet
};

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const res = await login({ identifier, password }).unwrap();
      if (res.twoFARequired) {
        navigate("/verify-otp");
      } else {
        dispatch(setCredentials({ user: res.user, accessToken: res.accessToken }));
        navigate("/dashboard");
      }
    } catch (err) {
      setErrorMsg(err?.data?.error || "Invalid credentials. Try again.");
    }
  };

  return (
    <div className="tricksy-bg min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Large playful SVG splash background as in logo */}
      <svg
        className="absolute top-0 left-0 w-full h-full z-0"
        aria-hidden="true"
        preserveAspectRatio="none"
        style={{ pointerEvents: "none" }}
        viewBox="0 0 1600 800"
      >
        <defs>
          <linearGradient id="tricksy-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={PALETTE.primary} />
            <stop offset="70%" stopColor={PALETTE.accent} />
            <stop offset="100%" stopColor={PALETTE.bgDeep} />
          </linearGradient>
        </defs>
        <ellipse cx="1150" cy="230" rx="480" ry="200" fill="url(#tricksy-grad)" fillOpacity="0.22" />
        <ellipse cx="440" cy="600" rx="540" ry="240" fill="url(#tricksy-grad)" fillOpacity="0.18" />
        <ellipse cx="900" cy="500" rx="340" ry="120" fill={PALETTE.primary} fillOpacity="0.14" />
        {/* Splash and dots to echo the playful logo */}
        <circle cx="220" cy="180" r="60" fill={PALETTE.primary} fillOpacity="0.15" />
        <circle cx="1330" cy="720" r="55" fill={PALETTE.accent} fillOpacity="0.13" />
        <circle cx="1450" cy="350" r="26" fill={PALETTE.bgDeep} fillOpacity="0.18" />
        <circle cx="700" cy="120" r="18" fill={PALETTE.bgLight} fillOpacity="0.25" />
      </svg>
      {/* Login Card */}
      <div className="relative w-full max-w-md z-10 bg-white/60 backdrop-blur-lg border border-[#b6bfff40] shadow-2xl rounded-3xl p-8">
        {/* Tricksy logo SVG for prominent brand presence */}
        <div className="flex justify-center mb-8">
          <img
            src="public\logo.jpeg"
            alt="Tricksy logo"
            className="w-44 h-auto drop-shadow-lg"
            style={{ filter: "drop-shadow(0 2px 10px #4fc3ee60)" }}
          />
        </div>
        <h2
          className="text-2xl sm:text-3xl font-extrabold text-center mb-4"
          style={{ color: PALETTE.accent, letterSpacing: "0.02em" }}
        >
          Welcome Back
        </h2>
        <p
          className="text-md text-center mb-7"
          style={{ color: PALETTE.primary, fontWeight: 500 }}
        >
          Sign in to your Tricksy account
        </p>
        {errorMsg && (
          <div className="mb-4 flex items-center gap-2 bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg animate-shake">
            <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeWidth="2"
                d="M12 9v2m0 4h.01M12 5a7 7 0 100 14 7 7 0 000-14z"
              />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Email or Phone"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#b6bfff80] bg-white/60 text-[#514a7a] placeholder-[#bbb6fa] focus:outline-none focus:ring-2 focus:ring-[#5e65ec] transition shadow"
              autoFocus
            />
            <svg
              className="absolute left-4 top-3.5 h-6 w-6 text-[#5e65ec] opacity-80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="8" strokeWidth="2" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0z"
              />
            </svg>
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#b6bfff80] bg-white/60 text-[#514a7a] placeholder-[#bbb6fa] focus:outline-none focus:ring-2 focus:ring-[#4fc3ee] transition shadow"
            />
            <svg
              className="absolute left-4 top-3.5 h-6 w-6 text-[#4fc3ee] opacity-80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8V7a5 5 0 00-10 0v1M5 12h14"
              />
            </svg>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-[#5e65ec] via-[#4fc3ee] to-[#b6bfff] shadow-md hover:scale-[1.02] active:scale-[0.98] transition text-white tracking-wide"
            style={{ boxShadow: "0 6px 32px 2px #4fc3ee24" }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-[#514a7a]">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-[#4fc3ee] font-semibold hover:underline focus:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
