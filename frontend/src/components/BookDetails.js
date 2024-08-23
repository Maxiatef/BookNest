// src/components/BookDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!book) return <div>Book not found</div>;

    return (
        <div>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Categories: {book.categories.join(', ')}</p>
            <p>ISBN: {book.isbn}</p>
            <h3>Borrowing History</h3>
            <ul>
                {book.borrowingHistory.map((record, index) => (
                    <li key={index}>
                        Borrowed: {new Date(record.borrowedDate).toLocaleDateString()},
                        Returned: {record.returnedDate ? new Date(record.returnedDate).toLocaleDateString() : 'Not returned yet'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookDetails;