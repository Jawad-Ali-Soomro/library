const Book = require("../models/bookModel");
const User = require("../models/userModel");
const Borrow = require("../models/borrowModel");
exports.getAllBooks = async (req, res) => {
  try {
    let filter = {};

    if (req.body.title) {
      filter.title = { $regex: req.body.title, $options: "i" }; // Case-insensitive partial match
    }
    if (req.body.category) {
      filter.category = req.body.category;
    }
    if (req.body.publishedYear) {
      filter.publishedYear = req.body.publishedYear;
    }

    const books = await Book.find(filter);
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

exports.borrowBooks = async (req, res) => {
  const { bookId, userId } = req.body;
  const findUser = await User.findById(userId);
  const findBook = await Book.findById(bookId);
  if (!findUser || !findBook) {
    return res.status(404).json({ message: "User or book not found" });
  }
  if (findBook.availableCopies < 1) {
    return res.status(400).json({ message: "Book is not available" });
  }
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + 15);
  const borrowed = await Borrow.create({
    book: findBook._id,
    borrower: findUser._id,
    dueDate: futureDate.toISOString().split("T")[0],
  });
  findUser.borrowedBooks.push(borrowed._id);
  findBook.availableCopies - 1;
  findBook.borrowedCopies.push(borrowed._id);
  await findUser.save();
  await findBook.save();
};
