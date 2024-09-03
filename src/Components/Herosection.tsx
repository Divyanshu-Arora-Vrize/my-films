import React from 'react';
import '../styles.css'; // Optional: If you want to include custom styling for the hero section

const HeroSection: React.FC = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Welcome to Movie App</h1>
        <p>Discover, favorite, and add movies to your watchlist!</p>
        <button className="cta-button">Explore Now</button>
      </div>
    </div>
  );
};

export default HeroSection;
