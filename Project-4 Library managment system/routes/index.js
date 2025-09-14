const express = require('express');
const routes = express.Router();
const BookCtr = require('../controller/bookCtr');
const BookModel = require('../model/bookmodel');

routes.get('/', BookCtr.book);
routes.get('/addbook', BookCtr.book);
routes.post('/addbook', BookModel.uploadedImage, BookCtr.addBook);
routes.get('/viewBook', BookCtr.viewBook);
routes.get('/deletebook/:id', BookCtr.deleteBook);
routes.get('/editBook/:id', BookCtr.editBook);
routes.post('/editBook/:id', BookCtr.updateBook);

module.exports = routes;
