const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const discountUserHotelSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
    immutable: true,
  },
  discount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Discount",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const DiscountUserHotel = mongoose.model(
  "DiscountUserHotel",
  discountUserHotelSchema
);
module.exports = DiscountUserHotel;
