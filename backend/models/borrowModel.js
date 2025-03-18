const mongoose = require("mongoose");
const borrowSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  borrower: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  borrowedAt: { type: Date, default: Date.now },
  returnedAt: { type: Date },
  dueDate: { type: Date },
});

borrowSchema.pre("save", function (next) {
  if (!this.dueDate) {
    this.dueDate = new Date(
      this.borrowedAt.getTime() + 15 * 24 * 60 * 60 * 1000
    );
  }
  next();
});

const Borrow = mongoose.model("Borrow", borrowSchema);
module.exports = Borrow;
