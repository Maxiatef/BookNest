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
    "title": "The Hitchhiker's Guide to the Galaxy",
    "author": "Douglas Adams",
    "categories": ["Science Fiction", "Comedy", "Adventure"],
    "cover": "https://images-na.ssl-images-amazon.com/images/I/51J7-1e6-PL._SX331_BO1,204,203,200_.jpg",
    "mybook": true,
    "isbn": "9780345391803",
    "borrowingHistory": [
        {
            "borrowedDate": "2021-05-10T00:00:00.000Z",
            "returnedDate": "2021-05-20T00:00:00.000Z"
        }
    ]
}

*/