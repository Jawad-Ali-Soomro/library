const express = require("express");
const {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
} = require("../controllers/bookController");
const bookRoute = express.Router();

bookRoute.post("/add", addBook);
bookRoute.post("/get/all", getAllBooks);
bookRoute.post("/get/:id", getBookById);
bookRoute.post("/update:/id", updateBook);

module.exports = bookRoute;
