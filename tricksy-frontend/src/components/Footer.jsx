import React from "react";

const PALETTE = {
  primary: "#4fc3ee",
  accent: "#5e65ec",
  bgDark: "#2b2e41",
  textLight: "#d3d6f0",
  textMuted: "#a4a7c1",
};

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: PALETTE.bgDark }}
      className="w-full py-8 px-6 mt-20"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 flex items-center">
          <img
            src="/logo.png"
            alt="Tricksy Logo"
            className="h-10 w-auto mr-3"
            style={{ filter: `drop-shadow(0 2px 6px ${PALETTE.primary}88)` }}
          />
          <span
            style={{ color: PALETTE.textLight, letterSpacing: "0.05em" }}
            className="text-lg font-semibold select-none"
          >
            Tricksy
          </span>
        </div>
        <p
          style={{ color: PALETTE.textMuted }}
          className="text-sm text-center md:text-left max-w-md"
        >
          © {new Date().getFullYear()} Tricksy. All rights reserved.
          <br />
          Simplifying service booking with trust and ease.
        </p>
      </div>
    </footer>
  );
}
