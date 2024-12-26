const Review = require("../models/review");

const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().populate("user").populate("hotel");
    if (!reviews) {
      res.status(404);
      throw new Error("There are no reviews available");
    }
    return res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

const getReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("user")
      .populate("hotel");
    if (!review) {
      res.status(404);
      throw new Error("There is no review by this ID");
    }
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

const createReview = async (req, res, next) => {
  try {
    const { rating, description, user, hotel } = req.body;
    const newReview = new Review({
      rating,
      description,
      user,
      hotel,
    });
    if (!rating) {
      res.status(404);
      throw new Error("Rating is required");
    }
    if (!description) {
      res.status(404);
      throw new Error("Description is required");
    }
    if (!user) {
      res.status(404);
      throw new Error("User is required");
    }
    if (!hotel) {
      res.status(404);
      throw new Error("Hotel is required");
    }
    savedReview = await newReview.save();
    res.status(200).json(savedReview);
  } catch (error) {
    next(error);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!review) {
      res.status(404);
      throw new Error("Cannot Update The Review");
    }
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {  
      res.status(404);
      throw new Error("Cannot Delete The Review");
    }
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
};
