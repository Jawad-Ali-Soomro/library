const express = require("express");
const {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  borrowBooks,
  returnBook,
} = require("../controllers/bookController");
const bookRoute = express.Router();

bookRoute.post("/add", addBook);
bookRoute.post("/get/all", getAllBooks);
bookRoute.post("/get/:id", getBookById);
bookRoute.post("/update/:id", updateBook);
bookRoute.post("/borrow", borrowBooks);
bookRoute.post("/return", returnBook);
bookRoute.get("/borrowed", returnBook);

module.exports = bookRoute;
