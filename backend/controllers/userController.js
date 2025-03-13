const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already in use" });
    const newUser = new User({ username, email, password });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
