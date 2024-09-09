import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faHeart, faStar, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import useTheme from './useTheme'; // Import the custom hook
import '../styles.css';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme(); // Use the custom hook

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
