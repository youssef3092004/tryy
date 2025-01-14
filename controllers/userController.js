const User = require("../models/userModel");
const bcrypt = require("bcrypt");

/**
 * @function getUsers
 * @description Retrieves all users from the database.
 * @route GET /api/users
 * @access Private
 * @returns {JSON} JSON array containing all users in the database.
 * @throws {Error} If no users are found in the database.
 *
 * This function fetches all users from the database. If no users are found, 
 * it returns a 404 error with a message. If successful, it returns a 
 * JSON array containing all users.
 */
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      res.status(404);
      throw new Error("There are no users available");
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * @function getUser
 * @description Fetches a specific user by their ID.
 * @route GET /api/users/:id
 * @access Public
 * @param {string} id - The ID of the user to fetch.
 * @returns {JSON} JSON object containing the user's data.
 * @throws {Error} If no user is found by the provided ID.
 *
 * This function retrieves a user from the database by their ID.
 * If the user is found, the user's data is returned in the response.
 * If no user is found, an error message is thrown.
 */
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("There are no users available");
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * @function createUser
 * @description Creates a new user in the database.
 * @route POST /api/users
 * @access Public
 * @returns {JSON} JSON object containing the newly created user.
 * @throws {Error} If any required field is missing or if there is a problem creating the user.
 *
 * This function validates the required fields, hashes the user's password, and saves
 * the new user to the database. It checks that all fields are provided, and if any
 * are missing, it throws an error.
 */
const createUser = async (req, res, next) => {
  try {
    const { username, fname, lname, address, phone, email, password } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      fname,
      lname,
      address,
      phone,
      email,
      password: hashedPassword,
    });
    if (!username) {
      res.status(404);
      throw new Error("Username is required");
    }
    if (!fname) {
      res.status(404);
      throw new Error("First Name is required");
    }
    if (!lname) {
      res.status(404);
      throw new Error("Last Name is required");
    }
    if (!address) {
      res.status(404);
      throw new Error("Address is required");
    }
    if (!phone) {
      res.status(404);
      throw new Error("Phone is required");
    }
    if (!email) {
      res.status(404);
      throw new Error("Email is required");
    }
    if (!password) {
      res.status(404);
      throw new Error("Password is required");
    }
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};

/**
 * @function updateUser
 * @description Updates an existing user in the database based on provided fields.
 * @route PUT /api/users/:id
 * @access Private
 * @returns {JSON} JSON object containing the updated user.
 * @throws {Error} If no fields are provided for update or if the user does not exist.
 *
 * This function validates the fields provided in the request body, hashes the new password
 * if provided, and updates the user in the database with the new information. If no fields
 * are provided for update or if the user is not found, it throws an error.
 */
const updateUser = async (req, res, next) => {
  try {
    const { username, fname, lname, address, phone, email, password } =
      req.body;

    const updateField = {};
    if (username) {
      updateField.username = username;
    }
    if (fname) {
      updateField.fname = fname;
    }
    if (lname) {
      updateField.lname = lname;
    }
    if (address) {
      updateField.address = address;
    }
    if (phone) {
      updateField.phone = phone;
    }
    if (email) {
      updateField.email = email;
    }
    if (password) {
      updateField.password = await bcrypt.hash(password, 10);
    }
    if (Object.keys(updateField).length === 0) {
      res.status(400);
      throw new Error("No fields provided for update");
    }
    const user = await User.findByIdAndUpdate(req.params.id, updateField, {
      new: true,
    });
    if (!user) {
      res.status(400);
      throw new Error("no user with this id" + req.params.id);
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * @function deleteUser
 * @description deletes an existing user from the database based on the user ID.
 * @route DELETE /api/users/:id
 * @access Private
 * @param {string} req.params.id - The ID of the user to be deleted.
 * @returns {JSON} JSON object containing a success message upon successful deletion.
 * @throws {Error} If the user does not exist or cannot be deleted.
 *
 * This function deletes a user from the database based on the provided user ID.
 * If the user with the specified ID does not exist, an error is thrown.
 */
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(400);
      throw new Error("no user with this id" + req.params.id);
    }
    res.status(200).json({ msg: "the user has been deleted Successfuly" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
