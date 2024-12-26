const Amenity = require("../models/amenity");

const getAmenities = async (req, res, next) => {
  try {
    const amenities = await Amenity.find().populate("hotel_amenities");
    if (!amenities) {
      res.status(404);
      throw new Error("There are no amenities available");
    }
    return res.status(200).json(amenities);
  } catch (error) {
    next(error);
  }
};

const getAmenity = async (req, res, next) => {
  try {
    const amenity = await Amenity.findById(req.params.id).populate(
      "hotel_amenities"
    );
    if (!amenity) {
      res.status(404);
      throw new Error("There is no amenity by this ID");
    }
    res.status(200).json(amenity);
  } catch (error) {
    next(error);
  }
};

const createAmenity = async (req, res, next) => {
  try {
    const { name, description, hotel_amenities } = req.body;
    if (!name) {
      res.status(400);
      throw new Error("Name is required");
    }
    if (!description) {
      res.status(400);
      throw new Error("Description is required");
    }
    if (!hotel_amenities) {
      res.status(400);
      throw new Error("Hotel Amenities is required");
    }
    const newAmenity = new Amenity({
      name,
      description,
      hotel_amenities,
    });
    const savedAmenity = await newAmenity.save();
    res.status(201).json(savedAmenity);
  } catch (error) {
    next(error);
  }
};

const updateAmenity = async (req, res, next) => {
  try {
    const amenity = await Amenity.findById(req.params.id);
    if (!amenity) {
      res.status(404);
      throw new Error("There is no amenity by this ID");
    }
    const { name, description, hotel_amenities } = req.body;
    if (name) {
      amenity.name = name;
    }
    if (description) {
      amenity.description = description;
    }
    if (hotel_amenities) {
      amenity.hotel_amenities = hotel_amenities;
    }
    const updatedAmenity = await amenity.save();
    res.status(200).json(updatedAmenity);
  } catch (error) {
    next(error);
  }
};

const deleteAmenity = async (req, res, next) => {
    try {
        const amenity = await Amenity.findById(req.params.id);
        if (!amenity) {
        res.status(404);
        throw new Error("There is no amenity by this ID");
        }
        await amenity.remove();
        res.status(200).json({ message: "Amenity removed" });
    } catch (error) {
        next(error);
    }
}

module.exports = {
  getAmenities,
  getAmenity,
  createAmenity,
  updateAmenity,
  deleteAmenity,
};
