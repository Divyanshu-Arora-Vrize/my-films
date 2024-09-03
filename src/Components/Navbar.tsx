import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faHeart, faTv, faStar } from '@fortawesome/free-solid-svg-icons';
import '../styles.css';

const Navbar: React.FC = () => {
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
      </div>
    </nav>
  );
};

export default Navbar;

