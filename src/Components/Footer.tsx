import React from 'react';
import '../styles.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Copyright © 2024 My Films. All rights reserved.</p>
        <div className="footer-links">
          <a href="/privacy-policy" className="footer-link">
            Privacy Policy
          </a>
          <span>|</span>
          <a href="/terms-and-conditions" className="footer-link">
            Terms and Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
