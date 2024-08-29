import React from "react";
import '../styles.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <span>My Films</span>
            </div>
            <div className="navbar-links">
                <a href="/">Home</a>
                <a href="/watchlist">Watchlist</a>
                <a href="/favorites">Favorites</a>
            </div>
        </nav>
    );
};

export default Navbar;
