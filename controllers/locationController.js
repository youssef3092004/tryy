const Location = require("../models/locationModel");

/**
 * @function getLocations
 * @description Fetches all locations from the database.
 * @route GET /api/locations
 * @access Public
 * @returns {JSON} JSON array of location objects.
 * @throws {Error} If no locations are found in the database or if the database query fails.
 *
 * This function queries the database for all location documents and returns them as a JSON array.
 * If no locations are found, it responds with a 404 status code and an error message.
 */
const getLocations = async (req, res, next) => {
  try {
    const locations = await Location.find();
    if (!locations || locations.length === 0) {
      res.status(404);
      throw new Error("There are no locations available");
    }
    return res.status(200).json(locations);
  } catch (error) {
    next(error);
  }
};

/**
 * @function getLocation
 * @description Fetches a single location from the database by its ID.
 * @route GET /api/locations/:id
 * @access Public
 * @param {string} id - The ID of the location to fetch from the database.
 * @returns {JSON} A JSON object representing the location.
 * @throws {Error} If no location is found for the provided ID or if the database query fails.
 *
 * This function queries the database for a location by its unique ID provided in the request parameters.
 * If the location is found, it returns the location data as a JSON object.
 * If no location is found, it responds with a 404 status code and an error message.
 */
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

/**
 * @function createLocation
 * @description Creates a new location in the database.
 * @route POST /api/locations
 * @access Public
 * @param {Object} req.body - The request body containing the location details.
 * @param {string} req.body.country - The country of the location.
 * @param {string} req.body.city - The city of the location.
 * @param {string} req.body.address - The address of the location.
 * @param {string} req.body.zip_code - The zip code of the location.
 * @returns {JSON} A JSON object representing the newly created location.
 * @throws {Error} If any required field is missing or if the database query fails.
 *
 * This function receives location data from the request body, validates that all required fields are present,
 * creates a new location document, and saves it to the database. If successful, it returns the saved location
 * as a JSON object. If any required field is missing, it responds with a 404 status code and an error message.
 */
const createLocation = async (req, res, next) => {
  try {
    const { country, city, address, zip_code } = req.body;
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
    const newLocation = new Location({
      country,
      city,
      address,
      zip_code,
    });
    const savedLocation = await newLocation.save();
    return res.status(200).json(savedLocation);
  } catch (error) {
    next(error);
  }
};

/**
 * @function updateLocation
 * @description Updates an existing location in the database.
 * @route PUT /api/locations/:id
 * @access Public
 * @returns {JSON} JSON object representing the updated location.
 * @throws {Error} If no fields are provided for update or if the location is not found.
 *
 * This function updates the location with the specified ID by modifying the fields provided in the request body.
 * If no fields are provided, it responds with an error. If the location is not found, it returns a 404 error.
 */
const updateLocation = async (req, res, next) => {
  try {
    const { country, city, address, zip_code } = req.body;
    const updateField = {};
    if (country) updateField.country = country;
    if (city) updateField.city = city;
    if (address) updateField.address = address;
    if (zip_code) updateField.zip_code = zip_code;
    if (Object.keys(updateField).length === 0) {
      res.status(400);
      throw new Error("Please provide fields to update");
    }
    for (let field in updateField) {
      if (!updateField[field] || updateField[field].trim() === "") {
        res.status(400);
        throw new Error(
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
        );
      }
    }
    const location = await Location.findByIdAndUpdate(
      req.params.id,
      updateField,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!location) {
      res.status(404);
      throw new Error("There is no location by this ID");
    }
    location.updated_at = Date.now();
    const savedLocation = await location.save();
    return res.status(200).json({
      success: true,
      message: "Location updated successfully",
      data: savedLocation,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @function deleteLocation
 * @description Deletes a location from the database by its ID.
 * @route DELETE /api/locations/:id
 * @access Public
 * @returns {JSON} JSON object representing the deleted location.
 * @throws {Error} If the location is not found by the given ID.
 *
 * This function deletes the location with the specified ID. If no location is found by that ID,
 * it responds with a 404 error. Upon successful deletion, the deleted location is returned.
 */
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
