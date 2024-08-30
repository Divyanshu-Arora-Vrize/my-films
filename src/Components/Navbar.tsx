import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span>My Films</span>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/watchlist">Watchlist</Link> {/* New link to Watchlist */}
      </div>
    </nav>
  );
};

export default Navbar;
