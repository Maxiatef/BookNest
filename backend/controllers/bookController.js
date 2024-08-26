const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get book by id
exports.getBookByID = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addBook = async (req, res) => {
    const book = new Book(req.body);
    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//find by search of title or author
// http://localhost:5001/api/books/search?search=Max
exports.searchBooks = async (req, res) => {
    const { search } = req.query;  // Change this line from req.params to req.query
    console.log('Search query:', search);

    if (!search) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    try {
        const books = await Book.find({
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { author: { $regex: search, $options: 'i' } },
            ],
        });
        console.log('Search results:', books);
        res.json(books);
    }
    catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: error.message });
    }
};

//update book using patch method
exports.updateBook = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedBook);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//delete book using delete method
exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        await Book.findByIdAndDelete(id);
        res.json({ message: 'Book deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//-------------------------------------------------------------------------------------------

//borrow book using post method
exports.borrowBook = async (req, res) => {
    const { id } = req.params;  // Get book ID from the request parameters
    const { borrowedDate } = req.body;  // Get the borrowedDate from the request body

    try {
        const book = await Book.findById(id);  // Find the book by its ID
        if (!book) {  // Check if the book exists
            return res.status(404).json({ message: 'Book not found' });
        }

        book.borrowingHistory.push({ borrowedDate });  // Add the borrowed date to the borrowing history
        book.mybook = 1;  // Set the mybook attribute to 1
        await book.save();  // Save the updated book document to the database
        res.json(book);  // Return the updated book document in the response
    } catch (error) {
        res.status(500).json({ message: error.message });  // Handle any errors and return a 500 status
    }
};


//returnBook using post method
exports.returnBook = async (req, res) => {
    const { id } = req.params;
    const { returnedDate } = req.body;

    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        // Update the latest borrowing record to include the return date
        const latestBorrow = book.borrowingHistory[book.borrowingHistory.length - 1];
        latestBorrow.returnedDate = returnedDate;
        // Set the mybook attribute to 0 to indicate it's no longer borrowed
        book.mybook = 0;
        await book.save();  // Save the updated book document
        res.json(book);  // Return the updated book document
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//get the books that mybook=1
exports.getMyBooks = async (req, res) => {
    try {
        const books = await Book.find({ mybook: 1 });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//filter by category
// http://localhost:5001/api/books?category=Science%20Fiction
// exports.filterBooks = async (req, res) => {
//     const { categories } = req.params;
//     try {
//         const categoryArray = categories
//         const books = await Book.find({ categories: { $in: categoryArray } });
//         res.json(books);
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// Implement other controller methods (getBook, updateBook, deleteBook, searchBooks, borrowBook, returnBook)