const User = require("../models/user");
const bcrypt = require("bcrypt");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(404);
      throw new Error("There are no users available");
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(res.params.id);
    if (!user) {
      res.status(404);
      throw new Error("There are no users available");
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

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
