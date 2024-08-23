const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');


router.get('/', bookController.getAllBooks);
router.get('/book/search', bookController.searchBooks);
router.get('/:id', bookController.getBookByID);


router.post('/', bookController.addBook);
router.post('/:id/return', bookController.returnBook);

router.patch('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);



// router.get('/filter/books/:category', bookController.filterBooks);

// Add other routes (GET /:id, PUT /:id, DELETE /:id, GET /search, POST /:id/borrow, POST /:id/return)

module.exports = router;