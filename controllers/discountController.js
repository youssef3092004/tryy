Discount = require("../models/discountModel");

const getDiscounts = async (req, res, next) => {
  try {
    const discounts = await Discount.find();
    if (!discounts) {
      res.status(404);
      throw new Error("There are no discounts available");
    }
    return res.status(200).json(discounts);
  } catch (error) {
    next(error);
  }
};

const getDiscount = async (req, res, next) => {
  try {
    const discount = await Discount.findById(req.params.id);
    if (!discount) {
      res.status(404);
      throw new Error("There is no discount by this ID");
    }
    return res.status(200).json(discount);
  } catch (error) {
    next(error);
  }
};

const createDiscount = async (req, res, next) => {
  try {
    const { code, discount, start_date, end_date, status } = req.body;
    const newDiscount = new Discount({
      code,
      discount,
      start_date,
      end_date,
      status,
    });
    if (!code) {
      res.status(404);
      throw new Error("Code is required");
    }
    if (!discount) {
      res.status(404);
      throw new Error("Discount is required");
    }
    if (!start_date) {
      res.status(404);
      throw new Error("Start Date is required");
    }
    if (!end_date) {
      res.status(404);
      throw new Error("End Date is required");
    }
    if (!status) {
      res.status(404);
      throw new Error("Status is required");
    }
    savedDiscount = await newDiscount.save();
    return res.status(200).json(savedDiscount);
  } catch (error) {
    next(error);
  }
};

const updateDiscount = async (req, res, next) => {
  try {
    const discount = await Discount.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!discount) {
      res.status(404);
      throw new Error("There is no discount by this ID");
    }
    return res.status(200).json(discount);
  } catch (error) {
    next(error);
  }
};

const deleteDiscount = async (req, res, next) => {
  try {
    const discount = await Discount.findByIdAndDelete(req.params.id);
    if (!discount) {
      res.status(404);
      throw new Error("There is no discount by this ID");
    }
    return res.status(200).json(discount);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDiscounts,
  getDiscount,
  createDiscount,
  updateDiscount,
  deleteDiscount,
};
