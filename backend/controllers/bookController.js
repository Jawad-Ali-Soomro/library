const Book = require("../models/bookModel");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error });
  }
};

exports.addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error adding book", error });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
};
