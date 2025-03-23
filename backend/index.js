const express = require("express");
const app = express();
const cors = require("cors");
const connectDatabase = require("./config/connectDatabase");
const userRoute = require("./routes/userRoute");
const bookRoute = require("./routes/bookRoute");
const notificationRoute = require("./routes/notification");
require("dotenv").config({
  path: "./config/.env",
});
app.use(express.json());
app.use(cors());
connectDatabase();
const port = process.env.PORT || 4000;
app.use("/user", userRoute);
app.use("/book", bookRoute);
app.use("/notification", notificationRoute);
app.listen(port, () => {
  console.log(`server running`);
});
