// src/components/BookList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(15); // Number of books per page
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

  // Calculate the current books to display based on the current page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // Handle page change with next and previous buttons
  const nextPage = () => {
    if (currentPage < Math.ceil(books.length / booksPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="hero">
        <div className="hero-left">
          <h2>Your Book Nest</h2>
          <div>
            <div className="hero-hand-icon">
              <p className="fav1">Welcome</p>
              <img
                src="https://i.pinimg.com/originals/c7/e9/48/c7e948d145620182b07dd4c9cba1178c.png"
                alt=""
              />
            </div>
            <p className="fav1">A Cozy Corner</p>
            <p className="fav">For All Your Favorite Reads!</p>
          </div>
        </div>
        <div className="hero-right">
          <img
            src="https://masterofmemory.com/wp-content/uploads/2014/02/Courses-4.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="line">
        <hr />
      </div>
      <div>
        <h2 className="booklist">Book List</h2>
        <div className="listbody">
          {currentBooks.map((book) => (
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
                        src={book.cover}
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
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(books.length / booksPerPage)}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(books.length / booksPerPage)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default BookList;
