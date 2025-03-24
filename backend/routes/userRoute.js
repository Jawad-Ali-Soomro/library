const express = require("express");
const {
  register,
  login,
  getUserById,
  getAllUser,
  updateProfile,
  verifyUser,
  UnverifyUser,
} = require("../controllers/userController");
const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/:userId", getUserById);
userRoute.get("/all", getAllUser);
userRoute.put("/:userId", updateProfile);
userRoute.patch("/:userId", verifyUser);
userRoute.patch("/unverify/:userId", UnverifyUser);

module.exports = userRoute;
