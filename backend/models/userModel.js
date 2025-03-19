const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },
  password: {
    type: String,
    required: true,
    min: 6,
    select: false,
  },
  avatar: {
    type: String,
    default: "",
  },
  department: {
    type: String,
  },
  roll_no: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  phone: {
    type: String,
    min: 10,
    max: 15,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  academic_year: {
    type: Number,
  },
  dateOfBirth: {
    type: Date,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: String,
  },

  role: {
    type: String,
    enum: ["user", "admin", "librarian"],
    default: "user",
  },
  borrowedBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Borrow",
    },
  ],
  totalFine: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  const today = new Date();
  let totalFine = 0;

  this.borrowedBooks.forEach((book) => {
    if (!book.returned && book.dueDate < today) {
      const daysLate = Math.ceil(
        (today - book.dueDate) / (1000 * 60 * 60 * 24)
      );
      const fineAmount = daysLate * 5;
      book.fine = fineAmount;
      totalFine += fineAmount;
    }
  });

  this.totalFine = totalFine;
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
