const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const locationRoutes = require("./routes/locationRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const discountRoutes = require("./routes/discountRoutes");
// const discountUserHotelRoutes = require("./routes/discountUserHotelRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const amenityRoutes = require("./routes/amenityRoutes");

const DB_PORT = process.env.DB_PORT || 3000;

connectDB();

const app = express();
app.use(express.json());
app.use(errorHandler);

// setup Routes
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/discounts", discountRoutes);
// app.use("/api/discountUserHotel", discountUserHotelRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/amenities", amenityRoutes);

app.get("/", (req, res) => {
  res.send("now you in a Hello page");
});

app.listen(DB_PORT, () => {
  console.log(`I' listening in port ${DB_PORT}`);
});
