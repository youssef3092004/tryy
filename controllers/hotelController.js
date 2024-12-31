const Hotel = require("../models/hotel");

const getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find().populate("location").populate("review");
    if (!hotels) {
      res.status(404);
      throw new Error("There are no hotels available");
    }
    return res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
      .populate("location")
      .populate("rooms")
      .populate("review");
    if (!hotel) {
      res.status(404);
      throw new Error("There is no hotel by this ID");
    }
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

const createHotel = async (req, res, next) => {
  try {
    const {
      name,
      property_type,
      star_rating,
      num_rooms,
      images,
      location,
      review,
    } = req.body;
    const newHotel = new Hotel({
      name,
      property_type,
      star_rating,
      num_rooms,
      images,
      location,
      review,
    });
    if (!name) {
      res.status(404);
      throw new Error("Name is required");
    }
    if (!star_rating) {
      res.status(404);
      throw new Error("Star Rating is required");
    }
    if (!num_rooms) {
      res.status(404);
      throw new Error("Number of Rooms is required");
    }
    if (!images) {
      res.status(404);
      throw new Error("Images are required");
    }
    if (!location) {
      res.status(404);
      throw new Error("Location is required");
    }
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

const updateHotel = async (req, res, next) => {
  try {
    const { name, property_type, star_rating, num_rooms, images, location } =
      req.body;
    const updateField = {};

    if (name) updateField.name = name;
    if (property_type) updateField.property_type = property_type;
    if (star_rating) updateField.star_rating = star_rating;
    if (num_rooms) updateField.num_rooms = num_rooms;
    if (images) updateField.images = images;
    if (location) updateField.location;
    if (Object.keys(updateField).length === 0) {
      res.status(400);
      throw new Error("Please provide fields to update");
    }
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: updateField },
      { new: true }
    );
    if (!hotel) {
      res.status(404);
      throw new Error("There is no hotel by this ID");
    }
    return res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

const deleteHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      res.status(404);
      throw new Error("There is no hotel by this ID");
    }
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHotels,
  getHotel,
  createHotel,
  updateHotel,
  deleteHotel,
};
