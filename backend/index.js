const express = require("express");
const app = express();
const cors = require("cors");
const connectDatabase = require("./config/connectDatabase");
const userRoute = require("./routes/userRoute");
const bookRoute = require("./routes/bookRoute");
const notificationRoute = require("./routes/notification");
const { openai } = require("@ai-sdk/openai");
const { generateText } = require("ai");
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
app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    const result = await generateText({
      model: openai("gpt-4o"),
      messages: [{ role: "user", content: message }],
    });

    res.json({ response: result.text });
  } catch (error) {
    console.error("Error in /chat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(port, () => {
  console.log(`server running`);
});
