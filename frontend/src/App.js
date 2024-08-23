// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookList from './components/BookList';
import BookSearch from './components/BookSearch';
import BookForm from './components/BookForm';
import BookDetails from './components/BookDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/add">Add Book</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/search" element={<BookSearch />} />
          <Route path="/add" element={<BookForm />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;