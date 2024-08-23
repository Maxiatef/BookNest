// src/components/BookSearch.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            console.log('Sending search request for:', query);  // Add this line
            const res = await axios.get(`http://localhost:5001/api/books/book/search?search=${query}`);
            console.log('Search response:', res.data);  // Add this line
            setResults(res.data);
        } catch (err) {
            console.error('Error searching books:', err.response ? err.response.data : err.message);
        }
    };

    return (
        <div>
            <h2>Search Books</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by title or author"
                />
                <button type="submit">Search</button>
            </form>
            <ul>
                {results.map((book) => (
                    <li key={book._id}>
                        <Link to={`/book/${book._id}`}>{book.title}</Link> by {book.author}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookSearch;