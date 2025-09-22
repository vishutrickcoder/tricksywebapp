// src/components/Spinner.jsx
import React from "react";

export default function Spinner({ size = 50 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: "6px solid #f3f3f3",
        borderTop: "6px solid #4f46e5", // primary color
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        margin: "50px auto",
      }}
    />
  );
}
