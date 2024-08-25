// src/components/BookList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/books');
        setBooks(res.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching books');
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="booklist">Book List</h2>
      <div className="listbody">
        {books.map((book) => (
          <Link
            to={`/book/${book._id}`}
            style={{ textDecoration: 'none' }}
            key={book._id}
          >
            <div className="book-card">
              <div className="book-card__cover">
                <div className="book-card__book">
                  <div className="book-card__book-front">
                    <img
                      className="book-card__img"
                      src="https://miblart.com/wp-content/uploads/2020/01/Daughter-of-Man-book-cover-scaled-1.jpeg"
                      alt={book.title}
                    />
                  </div>
                  <div className="book-card__book-back"></div>
                  <div className="book-card__book-side"></div>
                </div>
              </div>
              <div>
                <div className="marquee-container">
                  <div className="marquee">{book.title}</div>
                </div>
                <div className="book-card__author">{book.author}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookList;
