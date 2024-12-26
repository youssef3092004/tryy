const mongoose = require("mongoose");

const HOST = process.env.HOST || "Localhost";
const PORT = process.env.PORT || 3000;
const DATABASE = process.env.DATABASE || "BOOKIFY"
const USERNAME = process.env.USERNAME || "joe404"
PASSWORD = process.env.PASSWORD || "yo3092004"

const MONGO_URI = `mongodb://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
