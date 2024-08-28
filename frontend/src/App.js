// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookList from './components/BookList';
import BookSearch from './components/BookSearch';
import BookForm from './components/BookForm';
import BookDetails from './components/BookDetails';
import Navbar from './navbar/navbar';
import Mybooks from './components/Mybooks';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/search" element={<BookSearch />} />
          <Route path="/add" element={<BookForm />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/mybooks" element={<Mybooks />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
