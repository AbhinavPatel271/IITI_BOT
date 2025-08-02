import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark-theme");
      root.classList.remove("light-theme");
    } else {
      root.classList.add("light-theme");
      root.classList.remove("dark-theme");
    }
  }, [isDarkMode]);

  // Load saved theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="navbar">
      <div className="logo">💬 IITI - GPT</div>
      <div className="nav-center">
        <div className="nav-text logo" style={{ fontWeight: "bold" }}>
          YOUR PERSONAL CHAT ASSISTANT
        </div>
      </div>
      <div className="nav-actions">
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
          title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
        >
          <div className="toggle-icon-container">
            <Sun
              className={`toggle-icon sun-icon ${!isDarkMode ? "active" : ""}`}
              size={18}
            />
            <Moon
              className={`toggle-icon moon-icon ${isDarkMode ? "active" : ""}`}
              size={18}
            />
          </div>
          <div className={`toggle-slider ${isDarkMode ? "dark" : "light"}`}>
            <div className="toggle-thumb"></div>
          </div>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
