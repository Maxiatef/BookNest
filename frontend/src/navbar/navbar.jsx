import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="navbody">
      <div className="navbar">
        <div className="nav-logo">
          <img
            className="img-logo"
            src="https://clipground.com/images/book-logo-png-14.png"
            alt="Book Nest Logo"
          />
          <p>Book Nest</p>
        </div>
        <nav>
          <ul className="nav-menu">
            <li>
              <Link
                to="/"
                className="nav-menu"
                style={{ textDecoration: 'none' }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/search"
                className="nav-menu"
                style={{ textDecoration: 'none' }}
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                to="/mybooks"
                className="nav-menu"
                style={{ textDecoration: 'none' }}
              >
                My Books
              </Link>
            </li>
            <li>
              <Link
                to="/add"
                className="nav-menu"
                style={{ textDecoration: 'none' }}
              >
                Add Book
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
