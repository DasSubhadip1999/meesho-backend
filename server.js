import dotenv from "dotenv";
import color from "colors";
import express from "express";
import connectDB from "./config/db.js";
dotenv.config();

const PORT = process.env.PORT;
const app = express();
connectDB();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to meesho RESTAPI",
  });
});

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`.yellow.underline);
});
