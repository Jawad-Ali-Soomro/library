const Book = require("../models/bookModel");
const User = require("../models/userModel");
const Borrow = require("../models/borrowModel");
const Notification = require("../models/notifications");
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
  const borrowed = await Borrow.create({
    book: findBook._id,
    borrower: findUser._id,
  });
  findUser.borrowedBooks.push(borrowed._id);
  findBook.availableCopies--;
  findBook.borrowedCopies.push(borrowed._id);
  await Notification.create({
    user: findUser._id,
    type: "reservation",
    message: `You have a new reservation for book ${findBook.title}`,
  });
  await findUser.save();
  await findBook.save();
  return res.status(200).json({
    message: "Book borrowed successfully",
    borrowed,
  });
};

exports.returnBook = async (req, res) => {
  const { borrowId } = req.body;
  const findBorrow = await Borrow.findById(borrowId);
  const findUser = await User.findById(findBorrow.borrower);
  const findBook = await Book.findById(findBorrow.book);

  if (!findUser || !findBook) {
    return res.status(404).json({ message: "User or book not found" });
  }

  const today = new Date();
  findBorrow.returnedAt = today;

  findUser.borrowedBooks = findUser.borrowedBooks.filter(
    (id) => id.toString() !== findBorrow._id.toString()
  );
  findBook.borrowedCopies = findBook.borrowedCopies.filter(
    (id) => id.toString() !== findBorrow._id.toString()
  );

  findBook.availableCopies++; // Increment available copies

  await findBorrow.save();
  await findUser.save();
  await findBook.save();
  await Notification.create({
    user: findUser._id,
    type: "reservation",
    message: `You have returned book ${findBook.title}`,
  });
  return res.status(200).json({
    message: "Book returned successfully",
  });
};

exports.getAllBorrowedBooks = async (req, res) => {
  try {
    const borrowed = await Borrow.find().populate("book").populate("borrower");
    res.json(borrowed);
  } catch (error) {
    res.json({
      message: "Error fetching borrowed books",
      error,
    });
  }
};

exports.deleteBookAndAssociatedData = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);
    if (!book) {
      throw new Error("Book not found");
    }
    await Borrow.deleteMany({ book: bookId });
    await Book.findByIdAndDelete(bookId);
    return res.status(200).json({
      message: `Book with ID ${bookId} and associated borrow records deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting book and associated data:", error);
    throw error;
  }
};

exports.getUserNotifications = async (req, res) => {
  const { userId } = req.params;
  const userNotifications = await Notification.find({user: userId})
  if(userNotifications) {
    res.status(200).json(userNotifications);
  }
  else {
    res.status(404).json({ message: "User not found" });
  }
};

exports.deleteNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNotification = await Notification.findByIdAndDelete(id);
    if (deletedNotification) {
      res.status(200).json({ message: "Notification deleted successfully" });
    } else {
      res.status(404).json({ message: "Notification not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

