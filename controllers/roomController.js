const Room = require("../models/room");

const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find().populate("hotel").populate("amenities");
    if (!rooms) {
      res.status(404);
      throw new Error("There are no rooms available");
    }
    return res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id)
      .populate("hotel")
      .populate("amenities");
    if (!room) {
      res.status(404);
      throw new Error("There is no room by this ID");
    }
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

const createRoom = async (req, res, next) => {
  try {
    const { room_type, room_number, price, status, hotel, amenities } =
      req.body;
    const newRoom = new Room({
      room_type,
      room_number,
      price,
      status,
      hotel,
      amenities,
    });
    if (!room_type) {
      res.status(404);
      throw new Error("Room Type is required");
    }
    if (!room_number) {
      res.status(404);
      throw new Error("Room Number is required");
    }
    if (!price) {
      res.status(404);
      throw new Error("Price is required");
    }
    if (!status) {
      res.status(404);
      throw new Error("Status is required");
    }
    if (!hotel) {
      res.status(404);
      throw new Error("Hotel is required");
    }
    if (!amenities) {
      res.status(404);
      throw new Error("Amenities is required");
    }
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!room) {
      res.status(404);
      throw new Error("Cannot Update The User");
    }
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      res.status(404);
      throw new Error("No Room with This ID");
    }
    res.status(200).json("the room has been deleted Successfuly");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
};
