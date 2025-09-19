// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useVerifyOtpMutation } from "../features/auth/authApi";

// export default function VerifyOtp() {
//   const [otp, setOtp] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // email passed from signup via navigate state
//   const email = location.state?.email;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");
//     try {
// const res = await verifyOtp({ identifier: email, code: otp }).unwrap();      if (res.message === "OTP verified successfully") {
//         navigate("/login");
//       }
//     } catch (err) {
//       console.error("OTP verification failed", err);
//       setErrorMsg(err?.data?.error || "Invalid OTP. Try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
//         {/* Logo */}
//         <div className="flex justify-center mb-6">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="64"
//             height="64"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="url(#gradient)"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <defs>
//               <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor="var(--primary)" />
//                 <stop offset="100%" stopColor="var(--secondary)" />
//               </linearGradient>
//             </defs>
//             <path d="M12 2L2 7l10 5 10-5-10-5z" />
//             <path d="M2 17l10 5 10-5" />
//             <path d="M2 12l10 5 10-5" />
//           </svg>
//         </div>

//         <h2 className="text-2xl font-bold text-center text-[var(--dark)] mb-6">
//           Verify your OTP
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="otp"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-center tracking-widest"
//           />

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-2 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-black rounded-lg shadow-md hover:opacity-90 transition"
//           >
//             {isLoading ? "Verifying..." : "Verify OTP"}
//           </button>
//         </form>

//         {/* Error message */}
//         {errorMsg && (
//           <p className="mt-4 text-red-500 text-sm text-center">{errorMsg}</p>
//         )}

//         <p className="mt-6 text-sm text-center text-gray-600">
//           Didn’t get the OTP?{" "}
//           <button
//             onClick={() => navigate("/signup")}
//             className="text-[var(--secondary)] font-semibold hover:underline"
//           >
//             Resend
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { useVerifyOtpMutation } from "../features/auth/authApi";
// import { useNavigate } from "react-router-dom";

// export default function VerifyOtp() {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");
//     try {
//       const res = await verifyOtp({ identifier: email, code: otp }).unwrap();
//       if (res.message === "OTP verified successfully") {
//         navigate("/login");
//       }
//     } catch (err) {
//       console.error("OTP verification failed", err);
//       setErrorMsg(err?.data?.error || "Invalid OTP. Try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#5D3FD3] via-[#7B68EE] to-[#00BFFF]">
//       <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 animate-fadeIn">
//         {/* Logo */}
//         <div className="flex justify-center mb-6">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="70"
//             height="70"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="url(#gradient)"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="drop-shadow-lg"
//           >
//             <defs>
//               <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor="#5D3FD3" />
//                 <stop offset="100%" stopColor="#00BFFF" />
//               </linearGradient>
//             </defs>
//             <circle cx="12" cy="12" r="10" />
//             <path d="M8 12l2 2 4-4" />
//           </svg>
//         </div>

//         <h2 className="text-3xl font-bold text-center text-white mb-6">
//           Verify OTP 🔐
//         </h2>

//         {errorMsg && (
//           <div className="mb-4 flex items-center gap-2 bg-red-500/20 border border-red-400 text-red-200 px-4 py-2 rounded-lg animate-shake">
//             <span>{errorMsg}</span>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             type="email"
//             placeholder="Your Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00BFFF]"
//           />
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5D3FD3]"
//           />

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-3 bg-gradient-to-r from-[#5D3FD3] to-[#00BFFF] text-white font-semibold rounded-xl shadow-md hover:scale-[1.02] active:scale-[0.98] transition"
//           >
//             {isLoading ? "Verifying..." : "Verify OTP"}
//           </button>
//         </form>

//         <p className="mt-6 text-sm text-center text-white/80">
//           Didn’t receive OTP?{" "}
//           <button
//             onClick={() => console.log("Resend OTP")}
//             className="text-[#00BFFF] font-semibold hover:underline"
//           >
//             Resend
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useVerifyOtpMutation } from "../features/auth/authApi";
import { useNavigate } from "react-router-dom";

const PALETTE = {
  primary: "#4fc3ee",
  accent: "#5e65ec",
  bgLight: "#def7fb",
  bgDeep: "#bbb6fa",
};

export default function VerifyOtp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const res = await verifyOtp({ identifier: email, code: otp }).unwrap();
      if (res.message === "OTP verified successfully") {
        navigate("/login");
      }
    } catch (err) {
      console.error("OTP verification failed", err);
      setErrorMsg(err?.data?.error || "Invalid OTP. Try again.");
    }
  };

  return (
    <div className="tricksy-bg min-h-screen flex items-center justify-center relative overflow-hidden">
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
        <ellipse
          cx="1150"
          cy="230"
          rx="480"
          ry="200"
          fill="url(#tricksy-grad)"
          fillOpacity="0.22"
        />
        <ellipse
          cx="440"
          cy="600"
          rx="540"
          ry="240"
          fill="url(#tricksy-grad)"
          fillOpacity="0.18"
        />
        <ellipse
          cx="1150"
          cy="230"
          rx="480"
          ry="200"
          fill="url(#tricksy-grad)"
          fillOpacity="0.22"
        />
        <ellipse
          cx="440"
          cy="600"
          rx="540"
          ry="240"
          fill="url(#tricksy-grad)"
          fillOpacity="0.18"
        />
        <ellipse
          cx="900"
          cy="500"
          rx="340"
          ry="120"
          fill={PALETTE.primary}
          fillOpacity="0.14"
        />
        <circle
          cx="220"
          cy="180"
          r="60"
          fill={PALETTE.primary}
          fillOpacity="0.15"
        />
        <circle
          cx="1330"
          cy="720"
          r="55"
          fill={PALETTE.accent}
          fillOpacity="0.13"
        />
        <circle
          cx="1450"
          cy="350"
          r="26"
          fill={PALETTE.bgDeep}
          fillOpacity="0.18"
        />
        <circle
          cx="700"
          cy="120"
          r="18"
          fill={PALETTE.bgLight}
          fillOpacity="0.25"
        />
      </svg>

      <div className="relative w-full max-w-md z-10 bg-white/60 backdrop-blur-lg border border-[#b6bfff40] shadow-2xl rounded-3xl p-8">
        <div className="flex justify-center mb-8">
          <img
            src="public/logo.jpeg"
            alt="Tricksy logo"
            className="w-44 h-auto drop-shadow-lg"
            style={{ filter: "drop-shadow(0 2px 10px #4fc3ee60)" }}
          />
        </div>

        <h2
          className="text-2xl sm:text-3xl font-extrabold text-center mb-4"
          style={{ color: PALETTE.accent, letterSpacing: "0.02em" }}
        >
          Verify OTP 🔐
        </h2>
        <p
          className="text-md text-center mb-7"
          style={{ color: PALETTE.primary, fontWeight: 500 }}
        >
          Enter your email and the OTP sent to verify your account.
        </p>

        {errorMsg && (
          <div className="mb-4 flex items-center gap-2 bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg animate-shake">
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-4 py-3 rounded-xl border border-[#b6bfff80] bg-white/60 text-[#514a7a] placeholder-[#bbb6fa] focus:outline-none focus:ring-2 focus:ring-[#5e65ec] transition shadow"
            required
          />
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full pl-4 py-3 rounded-xl border border-[#b6bfff80] bg-white/60 text-[#514a7a] placeholder-[#bbb6fa] focus:outline-none focus:ring-2 focus:ring-[#4fc3ee] transition shadow"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-[#5e65ec] via-[#4fc3ee] to-[#b6bfff] shadow-md hover:scale-[1.02] active:scale-[0.98] transition text-white tracking-wide"
            style={{ boxShadow: "0 6px 32px 2px #4fc3ee24" }}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-[#514a7a]">
          Didn’t receive OTP?{" "}
          <button
            onClick={() => console.log("Resend OTP")}
            className="text-[#4fc3ee] font-semibold hover:underline focus:underline"
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}
