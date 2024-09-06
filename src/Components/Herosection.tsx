import React, { useState, useEffect } from 'react';
import '../styles.css'; // Custom styling for the hero section

const HeroSection: React.FC = () => {
  // Array of poster images
  const posterImages = [
    '/src/Components/image1.jpeg',  // Replace with actual image paths or URLs
    '/src/Components/image2.jpeg',
    '/src/Components/image3.jpg',
    '/src/pages/imagge.jpg'
    // Add more images as needed
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cycle through images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % posterImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, [posterImages.length]);

  return (
    <div
      className="hero-section"
      style={{
        backgroundImage: `url(${posterImages[currentImageIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="hero-content">
        <h1>Welcome to My Films</h1>
        <p>Your favorite Movies & Series all in one place</p>
        <input className="search-input" placeholder="Search here" />
        <button className="cta-button">Explore Now</button>
      </div>
    </div>
  );
};

export default HeroSection;
