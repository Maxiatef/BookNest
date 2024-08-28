import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BookForm.css';

const BookForm = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    categories: '',
    isbn: '',
    borrowingHistory: [
      {
        borrowedDate: '',
        returnedDate: '',
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'borrowedDate' || name === 'returnedDate') {
      setBook({
        ...book,
        borrowingHistory: [
          {
            ...book.borrowingHistory[0],
            [name]: value,
          },
        ],
      });
    } else {
      setBook({ ...book, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/books', {
        ...book,
        categories: book.categories.split(',').map((cat) => cat.trim()),
      });
      alert('Book added successfully!');
      setBook({
        title: '',
        author: '',
        categories: '',
        isbn: '',
        borrowingHistory: [
          {
            borrowedDate: '',
            returnedDate: '',
          },
        ],
      });
    } catch (err) {
      console.error('Error adding book:', err);
      alert('Error adding book. Please try again.');
    }
  };

  return (
    <div className="formbody">
      <div className="container mt-4">
        <h1 className="display-4 text-center">
          <i className="fas fa-book-open text-primary"></i> Request
          <span className="title">Book</span>
        </h1>
        <form id="book-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={book.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              className="form-control"
              value={book.author}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categories">Categories (comma-separated)</label>
            <input
              type="text"
              id="categories"
              name="categories"
              className="form-control"
              value={book.categories}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="submit"
            value="Request Book"
            className="btn btn-primary btn-block"
          />
        </form>
      </div>
    </div>
  );
};

export default BookForm;
