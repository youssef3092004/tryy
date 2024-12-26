const Hotel = require("../models/hotel");

const getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find()
      .populate("location")
      .populate("rooms")
      .populate("review");
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
      rooms,
      review,
    } = req.body;
    const newHotel = new Hotel({
      name,
      property_type,
      star_rating,
      num_rooms,
      images,
      location,
      rooms,
      review,
    });
    if (!name) {
      res.status(404);
      throw new Error("Name is required");
    }
    if (!property_type) {
      res.status(404);
      throw new Error("Property Type is required");
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
    if (!rooms) {
      res.status(404);
      throw new Error("Rooms are required");
    }
    if (!review) {
      res.status(404);
      throw new Error("Review is required");
    }
    savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

const updateHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
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
