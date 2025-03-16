const mongoose = require("mongoose");
const borrowSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  borrower: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  borrowedAt: { type: Date, default: Date.now },
  returnedAt: { type: Date },
  dueDate: { type: Date },
});

const Borrow = mongoose.model("Borrow", borrowSchema);
module.exports = Borrow;
