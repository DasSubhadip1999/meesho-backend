require("dotenv").config();
require("colors");
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
const sellerRouter = require("./routes/sellerRouter");

const PORT = process.env.PORT;
const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to meesho RESTAPI",
  });
});

app.use("api/sellers", sellerRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`.yellow.underline);
});
