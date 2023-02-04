require("dotenv").config();
require("colors");
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
const path = require("path");
const accessControl = require("./middleware/accessControlMiddleware");

const PORT = process.env.PORT;
const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));
app.use("/videos", express.static("videos"));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "dist")));

app.use("/api/sellers", require("./routes/sellerRouter"));
app.use("/api/users", require("./routes/userRouter"));
app.use("/api/products", require("./routes/productRouter"));
app.use("/api/orders/my-orders", require("./routes/orderRouter"));
app.use(accessControl);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`.yellow.underline);
});
