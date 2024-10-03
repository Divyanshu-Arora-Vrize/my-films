import React from 'react';
import '../styles.css';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="privacy-policy">
      <h2>Privacy Policy</h2>
      <p>
        We take your privacy seriously. This Privacy Policy outlines the types of personal
        information we collect, how we use and protect that information, and the choices
        you have regarding your data.
      </p>
      <h3>Information We Collect</h3>
      <p>
        We may collect the following information:
        <ul>
          <li>Personal identification information (Name, email address, etc.)</li>
          <li>Browsing data, cookies, and usage statistics</li>
        </ul>
      </p>
      <h3>How We Use Your Information</h3>
      <p>
        We may use the information we collect to:
        <ul>
          <li>Personalize your experience on the platform</li>
          <li>Improve the functionality of the website</li>
          <li>Provide customer support</li>
        </ul>
      </p>
      <h3>Data Protection</h3>
      <p>
        We implement a variety of security measures to protect your personal information.
        However, please note that no method of transmission over the internet is 100% secure.
      </p>
      <h3>Your Rights</h3>
      <p>
        You have the right to request access, update, or delete your personal data.
        If you would like to exercise these rights, please contact us at [Your Contact Information].
      </p>
      <h3>Contact Us</h3>
      <p>
        If you have any questions or concerns regarding this Privacy Policy, feel free to contact
        us at [Your Company Email].
      </p>
    </div>
  );
};

export default PrivacyPolicy;
