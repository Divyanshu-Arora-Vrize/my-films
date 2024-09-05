import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faHeart, faStar, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import '../styles.css';

// Custom Hook: useTheme
const useTheme = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Load saved theme from localStorage and set it on the body
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' || 'dark';
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  // Toggle theme and update body class and localStorage
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  return { theme, toggleTheme };
};

// Navbar Component
const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();  // Use the custom hook

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span>My Films</span>
      </div>
      <div className="navbar-links">
        <Link to="/">
          <FontAwesomeIcon icon={faHouse} /> Home
        </Link>
        <Link to="/favorites">
          <FontAwesomeIcon icon={faHeart} /> Favorites
        </Link>
        <Link to="/watchlist">
          <FontAwesomeIcon icon={faStar} /> Watchlist
        </Link>
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          <FontAwesomeIcon icon={theme === 'dark' ? faToggleOff : faToggleOn} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
