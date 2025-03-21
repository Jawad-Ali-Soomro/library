const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String },
    publishedYear: { type: Number },
    image: { type: String, default: "" },
    isbn: { type: String, unique: true },
    availableCopies: { type: Number, required: true, },
    totalCopies: { type: Number, required: true, default: 1 },
    borrowedCopies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Borrow" }],
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
