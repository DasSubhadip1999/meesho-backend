const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;
const db = process.env.DB;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${uri}/${db}`);
    console.log(`MongoDB connected to ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
