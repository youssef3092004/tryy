const mongoose = require("mongoose");

// const DATABASE = process.env.DB_DATABASE || "myDatabase";
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

let MONGO_URI;
if (!USERNAME || !PASSWORD) {
  MONGO_URI = `mongodb://${HOST}:${PORT}/${DATABASE}?retryWrites=true&w=majority`;
}
MONGO_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.jyduv.mongodb.net/myDatabase?retryWrites=true&w=majority`;

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
