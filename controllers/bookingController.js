Booking = require("../models/booking");

const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate("user")
      .populate("hotel")
      .populate("room")
      .populate("discount");
    if (!bookings) {
      res.status(404);
      throw new Error("There are no bookings available");
    }
    return res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user")
      .populate("hotel")
      .populate("room")
      .populate("discount");
    if (!booking) {
      res.status(404);
      throw new Error("There is no booking by this ID");
    }
    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

const createBooking = async (req, res, next) => {
  try {
    const {
      check_in,
      check_out,
      total_price,
      status,
      user,
      hotel,
      room,
      discount,
    } = req.body;
    const newBooking = new Booking({
      check_in,
      check_out,
      total_price,
      status,
      user,
      hotel,
      room,
      discount,
    });
    if (!check_in) {
      res.status(404);
      throw new Error("Check In is required");
    }
    if (!check_out) {
      res.status(404);
      throw new Error("Check Out is required");
    }
    if (!total_price) {
      res.status(404);
      throw new Error("Total Price is required");
    }
    if (!status) {
      res.status(404);
      throw new Error("Status is required");
    }
    if (!user) {
      res.status(404);
      throw new Error("User is required");
    }
    if (!hotel) {
      res.status(404);
      throw new Error("Hotel is required");
    }
    if (!room) {
      res.status(404);
      throw new Error("Room is required");
    }
    if (!discount) {
      res.status(404);
      throw new Error("Discount is required");
    }
    savedBooking = await newBooking.save();
    res.status(200).json(savedBooking);
  } catch (error) {
    next(error);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!booking) {
      res.status(400);
      throw new Error("no booking with this id" + req.params.id);
    }
    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      res.status(400);
      throw new Error("no booking with this id" + req.params.id);
    }
    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
};
