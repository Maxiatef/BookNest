const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    categories: [{ type: String, required: true }],
    cover : { type: String, required: false },
    isbn: { type: String, required: true, unique: true },
    mybook: { type:Number},
    borrowingHistory: [
        {
            borrowedDate: Date,
            returnedDate: Date,
        },
    ],
});

module.exports = mongoose.model('Book', BookSchema);
/*

{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "categories": ["Fiction", "Classic"],
    "cover": "https://m.media-amazon.com/images/I/81QuEGw8VPL._AC_UF1000,1000_QL80_.jpg",
    "isbn": "9780743273565",
    "borrowingHistory": []
}

{
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger",
    "categories": ["Fiction", "Classic"],
    "isbn": "9780316769488",
    "borrowingHistory": []
}

{
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "categories": ["Fiction", "Classic"],
    "isbn": "9780060935467",
    "borrowingHistory": []
}

{
    "title": "The Lord of the Rings",
    "author": "J.R.R. Tolkien",
    "categories": ["Fiction", "Fantasy"],
    "isbn": "9780618640157",
    "borrowingHistory": []
}

{
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "categories": ["Fiction", "Fantasy
}

*/