const Location = require("../models/location");

const getLocations = async (req, res, next) => {
  try {
    const locations = await Location.find();
    if (!locations) {
      res.status(404);
      throw new Error("There are no locations available");
    }
    return res.status(200).json(locations);
  } catch (error) {
    next(error);
  }
};

const getLocation = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      res.status(404);
      throw new Error("There is no location by this ID");
    }
    return res.status(200).json(location);
  } catch (error) {
    next(error);
  }
};

const createLocation = async (req, res, next) => {
  try {
    const { country, city, address, zip_code } = req.body;
    const newLocation = new Location({
      country,
      city,
      address,
      zip_code,
    });
    if (!country) {
      res.status(404);
      throw new Error("Country is required");
    }
    if (!city) {
      res.status(404);
      throw new Error("City is required");
    }
    if (!address) {
      res.status(404);
      throw new Error("Address is required");
    }
    if (!zip_code) {
      res.status(404);
      throw new Error("Zip Code is required");
    }
    savedLocation = await newLocation.save();
    return res.status(200).json(savedLocation);
  } catch (error) {
    next(error);
  }
};

const updateLocation = async (req, res, next) => {
  try {
    const location = await Location.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!location) {
      res.status(404);
      throw new Error("There is no location by this ID");
    }
    return res.status(200).json(location);
  } catch (error) {
    next(error);
  }
};

const deleteLocation = async (req, res, next) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) {
      res.status(404);
      throw new Error("There is no location by this ID");
    }
    return res.status(200).json(location);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
};
