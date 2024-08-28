import React from 'react';
import './Footer.css';
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src="https://clipground.com/images/book-logo-png-14.png" alt="" />
        <p>Book Nest</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 - All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
