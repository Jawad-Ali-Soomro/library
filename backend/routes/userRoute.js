const express = require("express");
const {
  register,
  login,
  getUserById,
} = require("../controllers/userController");
const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/:userId", getUserById);

module.exports = userRoute;
