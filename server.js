require("dotenv").config();
require("colors");
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");

const PORT = process.env.PORT;
const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

app.use("/api/sellers", require("./routes/sellerRouter"));
app.use("/api/users", require("./routes/userRouter"));
app.use("/api/products", require("./routes/productRouter"));
app.use("/api/orders/my-orders", require("./routes/orderRouter"));

app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to meesho RESTAPI",
  });
});

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`.yellow.underline);
});
