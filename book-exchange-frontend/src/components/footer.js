import React from 'react';
import './Footer.css'; // Optional: Link to CSS for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Peer-to-Peer Book Exchange. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;