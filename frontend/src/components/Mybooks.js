import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import './Mybooks.css'; // Make sure this file contains styles for book cards

const Mybooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchMyBooks = async () => {
            try {
                const res = await axios.get('http://localhost:5001/api/books/get/my/books');
                setBooks(res.data);
            } catch (err) {
                console.error('Error fetching books:', err.response ? err.response.data : err.message);
            }
        };

        fetchMyBooks();
    }, []);

    return (
        <div>
            <h2 className="booklist">My Books</h2>
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

export default Mybooks;
