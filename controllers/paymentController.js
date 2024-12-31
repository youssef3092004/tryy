const Payment = require("../models/payment");

const getPayments = async (req, res, next) => {
  try {
    const payment = await Payment.find().populate("user").populate("booking");
    if (!payment) {
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
    const savedPayment = await newPayment.save();
    res.status(200).json(savedPayment);
  } catch (error) {
    next(error);
  }
};

const updatePayment = async (req, res, next) => {
  try {
    const { payment_mathond, status, user, booking } = req.body;
    const updateField = {};

    if (payment_mathond) updateField.payment_mathond = payment_mathond;
    if (status) updateField.status = status;
    if (user) updateField.user = user;
    if (booking) updateField.booking = booking;
    if (Object.keys(updateField).length === 0) {
      res.status(400);
      throw new Error("No fields provided for update");
    }

    const payment = await Payment.findByIdAndUpdate(
      req.updateField,
      { $set: updateField },
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
