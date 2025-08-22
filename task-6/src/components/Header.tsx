// src/components/Header.tsx
import React from "react";

interface HeaderProps {
  onToggleTheme: () => void;
  themeDark?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleTheme, themeDark = false }) => {
  return (
    <header>
      <div className="logo">
        {/* Use the public folder path for Vite/CRA: /imgs/logo.png (public/imgs/logo.png) */}
        <img src="../../public/imgs/logo.png" width={42} height={42} alt="Timeline App logo" onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <h1>Timeline App</h1>
      </div>

      <button
        className="theme"
        onClick={onToggleTheme}
        aria-pressed={!!themeDark}
        aria-label={themeDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {themeDark ? "Light mode" : "Dark mode"}
      </button>
    </header>
  );
};

export default Header;
