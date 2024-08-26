import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BookSearch.css';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending search request for:', query);
      const res = await axios.get(
        `http://localhost:5001/api/books/book/search?search=${query}`
      );
      console.log('Search response:', res.data);
      setResults(res.data);
    } catch (err) {
      console.error(
        'Error searching books:',
        err.response ? err.response.data : err.message
      );
    }
  };

  return (
    <div className="searchbody">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="searchTerm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or author"
        />
        <button type="submit" className="searchButton">
          Search
        </button>
      </form>
      <div className="listbody">
        {results.map((book) => (
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
  );
};

export default BookSearch;
