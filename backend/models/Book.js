const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    categories: [{ type: String, required: true }],
    isbn: { type: String, required: true, unique: true },
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
    "title": "The Hitchhiker's Guide to the Galaxy",
    "author": "Douglas Adams",
    "categories": ["Science Fiction", "Comedy", "Adventure"],
    "isbn": "9780345391803",
    "borrowingHistory": [
        {
            "borrowedDate": "2021-05-10T00:00:00.000Z",
            "returnedDate": "2021-05-20T00:00:00.000Z"
        }
    ]
}

*/