import React from "react";

export default function PickaxeShovelLogo({ className = "h-8 w-8" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Pickaxe – amber */}
      <line
        x1="10"
        y1="10"
        x2="26"
        y2="26"
        stroke="hsl(var(--primary))"
        strokeWidth="2.5"
        strokeLinecap="square"
      />
      <path
        d="M4 14 C 6 6 16 4 20 8"
        stroke="hsl(var(--primary))"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="square"
      />
      {/* Shovel – emerald */}
      <line
        x1="24"
        y1="24"
        x2="38"
        y2="38"
        stroke="hsl(var(--secondary))"
        strokeWidth="2.5"
        strokeLinecap="square"
      />
      <path
        d="M35 32 L43 40 L40 43 L32 35 Z"
        stroke="hsl(var(--secondary))"
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="miter"
      />
      {/* Centre */}
      <circle cx="24" cy="24" r="1.8" fill="hsl(var(--foreground))" />
    </svg>
  );
}
