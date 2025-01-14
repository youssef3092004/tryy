const Booking = require("../models/bookingModel");
const Room = require("../models/roomModel");
const Discount = require("../models/discountModel");

const {
  incrementDiscountUsage,
  checkDiscountActiveOrInactive,
} = require("./discountController");

/**
 * @route GET /api/bookings
 * @desc Retrieve all bookings from the database.
 * @access Public
 * @returns {Array} List of all bookings, populated
 * with user, hotel, room, and discount details.
 * @throws {Error} If no bookings are found, returns
 * a 404 status with an error message.
 *
 * This route handler retrieves all bookings from the database and
 * populates related fields such as user, hotel, room, and discount.
 * If no bookings are found, a 404 error is thrown.
 * The bookings are returned in a JSON format with a 200 status code.
 */
const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate("user")
      .populate("hotel")
      .populate("room")
      .populate("discount")
      .exec();
    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "There is no bookings by this ID" });
    }
    res.status(200).json({
      success: true,
      message: "Booking retrieved successfully.",
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route GET /api/bookings/:id
 * @desc Retrieve a single booking by its ID.
 * @access Public
 * @param {string} id - The ID of the booking to retrieve.
 * @returns {Object} The booking object, populated with user, hotel, room,
 * and discount details.
 * @throws {Error} If the booking with the provided ID is not found,
 * returns a 404 status with an error message.
 *
 * This route handler retrieves a booking by its ID from the database and
 * populates related fields such as user, hotel, room, and discount.
 * If no booking is found, a 404 error is thrown.
 * The booking is returned in a JSON format with a 200 status code.
 */
const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user")
      .populate("hotel")
      .populate("room")
      .populate("discount")
      .exec();
    if (!booking) {
      return res
        .status(404)
        .json({ message: "There is no booking by this ID" });
    }
    res.status(200).json({
      success: true,
      message: "Booking retrieved successfully.",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route POST /api/bookings
 * @desc Create a new booking in the database.
 * @access Public
 * @body {Object} - The details of the new booking:
 *  - {string} check_in - The check-in date in ISO format.
 *  - {string} check_out - The check-out date in ISO format.
 *  - {string} status - The booking status (e.g., "confirmed").
 *  - {string} user - The ID of the user making the booking.
 *  - {string} hotel - The ID of the hotel for the booking.
 *  - {string} room - The ID of the room for the booking.
 *  - {string} discount - The ID of the discount applied (optional).
 * @returns {Object} The created booking object.
 * @throws {Error} If any required fields are missing, returns a 400 status
 * with an error message indicating the missing field.
 * @throws {Error} If the discount is inactive or exceeds usage limits,
 * throws an error and the booking creation process is halted.
 * @returns {Object} The newly created booking object, including booking details
 * and total price, with an HTTP status 200 (OK).
 *
 * This route handler creates a new booking by:
 * 1. Checking for the presence of all required fields.
 * 2. Calculating the total price based on room, check-in, and check-out dates.
 * 3. If a discount is applied, checking the discount's validity and incrementing usage.
 * 4. Applying the discount to the total price if applicable.
 * 5. Saving the booking in the database and returning the saved booking data.
 *
 * If a discount is provided:
 * - The handler checks whether the discount is active, calculates the adjusted price,
 *   and increments the usage count for the discount.
 *
 * The final booking object is returned in the response with a success message.
 */
const createBooking = async (req, res, next) => {
  try {
    const { check_in, check_out, status, user, hotel, room, discount } =
      req.body;
    const requiredFields = {
      check_in,
      check_out,
      status,
      user,
      hotel,
      room,
    };

    for (let i in requiredFields) {
      if (!requiredFields[i]) {
        return res.status(400).json({
          message: `${i.charAt(0).toUpperCase() + i.slice(1)} is required`,
        });
      }
    }

    let total_price = await calculateTotalPrice(room, check_in, check_out);
    console.log("total price", total_price);

    if (discount) {
      await checkDiscountActiveOrInactive(discount);
      total_price = await calculate_total_price_after_discount(
        discount,
        total_price
      );
      await incrementDiscountUsage(discount);
      console.log("total price after discount", total_price);
    }

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

    const savedBooking = await newBooking.save();
    res.status(200).json({
      success: true,
      message: "Booking successfully Created.",
      data: savedBooking,
    });
    console.log("Booking created successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @route PUT /api/bookings/:id
 * @desc Update an existing booking by its ID in the database.
 * @access Public
 * @param {string} id - The ID of the booking to update.
 * @body {Object} - The fields to update in the booking:
 *  - {string} check_in - The new check-in date (optional).
 *  - {string} check_out - The new check-out date (optional).
 *  - {string} status - The new status of the booking (optional).
 *  - {string} hotel - The updated hotel ID (optional).
 *  - {string} room - The updated room ID (optional).
 *  - {string} discount - The updated discount ID (optional).
 * @throws {Error} If no fields to update are provided,
 * returns a 400 status with an error message.
 * @throws {Error} If the booking with the provided ID is
 * not found, returns a 404 status with an error message.
 * @returns {Object} The updated booking object.
 *
 * This route handler updates an existing booking by its ID.
 * It first checks for any required fields in the request body, validates them,
 * and then updates the corresponding booking. If any fields
 * like `check_in`, `check_out`, or `room` are
 * updated, it recalculates the `total_price`.
 * If the booking with the specified ID does not exist, a 404 error is thrown.
 * The updated booking is returned in a JSON format with a 200 status code.
 */
const updateBooking = async (req, res, next) => {
  try {
    const { check_in, check_out, status, hotel, room, discount } = req.body;
    const updateField = {};
    if (check_in) updateField.check_in = check_in;
    if (check_out) updateField.check_out = check_out;
    if (status) updateField.status = status;
    if (hotel) updateField.hotel = hotel;
    if (room) updateField.room = room;
    if (discount) {
      updateField.discount = discount;
      await checkDiscountActiveOrInactive(discount);
      await incrementDiscountUsage(discount);
    }
    if (Object.keys(updateField).length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide fields to update." });
    }
    for (let i in updateField) {
      if (
        updateField[i] === undefined ||
        updateField[i] === null ||
        updateField[i].toString().trim() === ""
      ) {
        return res.status(400).json({
          message: `${i.charAt(0).toUpperCase() + i.slice(1)} is required.`,
        });
      }
    }
    const findBooking = await Booking.findById(req.params.id);
    if (!findBooking) {
      return res
        .status(404)
        .json({ message: `No booking found with this ID: ${req.params.id}` });
    }
    if (check_in || check_out || room) {
      const total_price = await calculateTotalPrice(
        room || findBooking.room,
        check_in || findBooking.check_in,
        check_out || findBooking.check_out
      );
      updateField.total_price = total_price;
    }
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: updateField },
      { new: true }
    );
    if (!booking) {
      return res
        .status(404)
        .json({ message: `No booking found with this ID: ${req.params.id}` });
    }
    res.status(200).json({
      success: true,
      message: "Booking successfully updated.",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route DELETE /api/bookings/:id
 * @desc Delete a booking by its ID.
 * @access Public
 * @param {string} id - The ID of the booking to delete.
 * @returns {Object} The deleted booking object.
 * @throws {Error} If the booking with the provided ID is not found,
 * returns a 400 status with an error message.
 *
 * This route handler deletes a booking by its ID from the database. If
 * the booking with the provided ID is not found, a 400 error is thrown.
 * The deleted booking is returned in a JSON format with a 200 status code.
 */
const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      res.status(400);
      throw new Error("no booking with this id" + req.params.id);
    }
    res.status(200).json({
      success: true,
      message: "Booking successfully Deleted.",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @function calculateTotalPrice
 * @desc Calculate the total price for a booking based on
 * the room price, check-in, and check-out dates.
 * @param {string} room - The ID of the room for the booking.
 * @param {string} check_in - The check-in date.
 * @param {string} check_out - The check-out date.
 * @returns {number} The total price for the booking.
 * @throws {Error} If the room is not found, or if the
 * dates are invalid, returns an error.
 *
 * This function calculates the total price for a booking by
 * finding the room's price and multiplying it by the number of nights between
 * the check-in and check-out dates.
 * If the room is not found or the dates are invalid, an error is thrown.
 */
const calculateTotalPrice = async (rooom, check_in, check_out) => {
  try {
    const room = await Room.findById(rooom);
    if (!room) {
      throw new Error("Invalid room");
    }
    if (room && check_in && check_out) {
      const checkInDate = new Date(check_in);
      const checkOutDate = new Date(check_out);
      if (isNaN(checkInDate) || isNaN(checkOutDate)) {
        throw new Error("Invalid check-in or check-out date");
      }
      if (checkInDate >= checkOutDate) {
        throw new Error("Check-out date must be greater than check-in date");
      }
      const nights = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );
      return room.price * nights;
    }
  } catch (error) {
    console.error("Error calculating total price:", error);
    throw error;
  }
};

/**
 * @function calculate_total_price_after_discount
 * @desc Calculate the total price after applying a discount.
 * @param {string} discountId - The ID of the discount to be applied.
 * @param {number} total_price - The original total price before the discount.
 * @returns {number} The total price after applying the discount.
 * @throws {Error} If the discount is invalid or not found, an error is thrown.
 *
 * This function fetches the discount from the database using the provided discount ID.
 * It then calculates and returns the total price after applying the discount percentage.
 * If the discount is invalid (not found in the database), an error is thrown.
 *
 * Example:
 * ```javascript
 * const finalPrice = await calculate_total_price_after_discount('discountId123', 100);
 * console.log(finalPrice); // 90 if the discount is 10%.
 * ```
 */
const calculate_total_price_after_discount = async (
  discountId,
  total_price
) => {
  try {
    const discountM = await Discount.findById(discountId);
    if (!discountM) {
      throw new Error("Invalid discount");
    }
    return total_price - (total_price * discountM.discount) / 100;
  } catch (error) {
    console.error("Error calculating total price after discount:", error);
    throw error;
  }
};

module.exports = {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
  calculateTotalPrice,
  calculate_total_price_after_discount,
};
