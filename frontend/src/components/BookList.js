// src/components/BookList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await axios.get('http://localhost:5001/api/books');
                setBooks(res.data);
                console.log(res);
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
            <h2>Book List</h2>
            <ul>
                {books.map((book) => (
                    <li key={book._id}>
                        <Link to={`/book/${book._id}`}>{book.title}</Link> by {book.author}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;