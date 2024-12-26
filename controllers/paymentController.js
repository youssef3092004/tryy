const Payment = require("../models/payment");

const getPayments = async (req, res, next) => {
  try {
    const paymnet = await Payment.find().populate("user").populate("booking");
    if (!paymnet) {
      res.status(404);
      throw new Error("There are no payments available");
    }
    return res.status(200).json(payment);
  } catch (error) {
    next(error);
  }
};

const getPayment = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("user")
      .populate("booking");
    if (!payment) {
      res.status(404);
      throw new Error("There is no payment by this ID");
    }
    return res.status(200).json(payment);
  } catch (error) {
    next(error);
  }
};

const createPayment = async (req, res, next) => {
  try {
    const { payment_mathond, status, user, booking } = req.body;
    const newPayment = new Payment({
      payment_mathond,
      status,
      user,
      booking,
    });
    if (!payment_mathond) {
      res.status(404);
      throw new Error("Payment Mathond is required");
    }
    if (!status) {
      res.status(404);
      throw new Error("Status is required");
    }
    if (!user) {
      res.status(404);
      throw new Error("User is required");
    }
    if (!booking) {
      res.status(404);
      throw new Error("Booking is required");
    }
    savedPayment = await newPayment.save();
    res.status(200).json(savedPayment);
  } catch (error) {
    next(error);
  }
};

const updatePayment = async (req, res, next) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!payment) {
      res.status(400);
      throw new Error("no payment with this id" + req.params.id);
    }
    res.status(200).json(payment);
  } catch (error) {
    next(error);
  }
};

const deletePayment = async (req, res, next) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      res.status(400);
      throw new Error("no payment with this id" + req.params.id);
    }
    res.status(200).json(payment);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPayments,
  getPayment,
  createPayment,
  updatePayment,
  deletePayment,
};
