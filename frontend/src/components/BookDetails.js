import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './BookDetails.css';

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [borrowedDate, setBorrowedDate] = useState('');
  const [borrowError, setBorrowError] = useState('');
  const [borrowSuccess, setBorrowSuccess] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnError, setReturnError] = useState('');
  const [returnSuccess, setReturnSuccess] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/books/${id}`);
        setBook(res.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching book details');
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleBorrowBook = async () => {
    if (!borrowedDate) {
      setBorrowError('Please select a borrowed date.');
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5001/api/books/${id}/borrow/book`,
        { borrowedDate }
      );
      setBook(res.data);
      setBorrowSuccess('Book borrowed successfully!');
      setBorrowError('');
    } catch (err) {
      setBorrowError('Error borrowing the book. Please try again.');
      setBorrowSuccess('');
    }
  };

  const handleReturnBook = async () => {
    if (!returnDate) {
      setReturnError('Please select a return date.');
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5001/api/books/${id}/return`,
        { returnedDate: returnDate }
      );
      setBook(res.data);
      setReturnSuccess('Book returned successfully!');
      setReturnError('');
      navigate('/mybooks');
    } catch (err) {
      setReturnError('Error returning the book. Please try again.');
      setReturnSuccess('');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div>
      {/*  <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Categories: {book.categories.join(', ')}</p>
      <p>ISBN: {book.isbn}</p>

      <h3>Borrowing History</h3>
      <ul>
        {book.borrowingHistory.map((record, index) => (
          <li key={index}>
            Borrowed: {new Date(record.borrowedDate).toLocaleDateString()},
            Returned:{' '}
            {record.returnedDate
              ? new Date(record.returnedDate).toLocaleDateString()
              : 'Not returned yet'}
          </li>
        ))}
      </ul>

      {book.mybook !== 1 && (
        <div>
          <h3>Borrow this Book</h3>
          <input
            type="date"
            value={borrowedDate}
            onChange={(e) => setBorrowedDate(e.target.value)}
          />
          <button onClick={handleBorrowBook}>Borrow</button>
          {borrowError && <p style={{ color: 'red' }}>{borrowError}</p>}
          {borrowSuccess && <p style={{ color: 'green' }}>{borrowSuccess}</p>}
        </div>
      )}

      {book.mybook === 1 && (
        <div>
          <h3>Return this Book</h3>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
          <button onClick={handleReturnBook}>Return Book</button>
          {returnError && <p style={{ color: 'red' }}>{returnError}</p>}
          {returnSuccess && <p style={{ color: 'green' }}>{returnSuccess}</p>}
        </div>
      )}*/}

      {/* Converted Pug Template to HTML */}

      <main className="book">
        <div className="book__wrapper">
          <div className="book__image">
            <img src={book.cover} alt="Book Cover" />
          </div>
          <div className="book__text--wrapper">
            <div className="book__title">
              <h3>{book.title}</h3>
            </div>
            <div className="book__author">
              <h5>{book.author}</h5>
            </div>
            <div className="book__details">
              <h6>Categories: {book.categories.join(', ')}</h6>
            </div>
            <div className="book__details">
              <h6>ISBN: {book.isbn}</h6>
            </div>
          </div>
          <div className="borrow">
            <h3 className="borrowing_history">Borrowing History</h3>
            <ul className="borrowing_details">
              {book.borrowingHistory.map((record, index) => (
                <li key={index}>
                  Borrowed: {new Date(record.borrowedDate).toLocaleDateString()}
                  , Returned:{' '}
                  {record.returnedDate
                    ? new Date(record.returnedDate).toLocaleDateString()
                    : 'Not returned yet'}
                </li>
              ))}
            </ul>

            {book.mybook !== 1 && (
              <div>
                <h3 className="borrowing_history">Borrow this Book</h3>
                <input
                  className="cal"
                  type="date"
                  value={borrowedDate}
                  onChange={(e) => setBorrowedDate(e.target.value)}
                />
                <button onClick={handleBorrowBook} className="borrow_btn">
                  Borrow
                </button>
                {borrowError && <p style={{ color: 'red' }}>{borrowError}</p>}
                {borrowSuccess && (
                  <p style={{ color: 'green' }}>{borrowSuccess}</p>
                )}
              </div>
            )}

            {book.mybook === 1 && (
              <div>
                <h3 className="borrowing_history">Return this Book</h3>
                <input
                  type="date"
                  className="cal"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
                <button onClick={handleReturnBook} className="borrow_btn">
                  Return Book
                </button>
                {returnError && <p style={{ color: 'red' }}>{returnError}</p>}
                {returnSuccess && (
                  <p style={{ color: 'green' }}>{returnSuccess}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetails;
