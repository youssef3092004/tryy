const { describe, it, expect } = require("@jest/globals");
const { updateAmenity } = require("../../controllers/amenityController");
const Amenity = require("../../models/ameniyModel");

jest.mock("../../models/ameniyModel");

describe("updateAmenity Controller", () => {
  it("should return a 400 error if any required field is empty", async () => {
    const req = {
      params: { id: "123" },
      body: { name: "", description: "A large pool" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await updateAmenity(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Name is required",
    });
  });

  it("should return a 404 error if the amenity is not found", async () => {
    Amenity.findByIdAndUpdate.mockResolvedValue(null);

    const req = {
      params: { id: "123" },
      body: { name: "Pool", description: "A large pool" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await updateAmenity(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Failed to update the amenity",
    });
  });

  it("should return a 200 status and the updated amenity if the update is successful", async () => {
    const mockAmenity = {
      _id: "123",
      name: "Pool",
      description: "A large pool",
      hotel_amenities: ["Hotel 1"],
    };

    Amenity.findByIdAndUpdate.mockResolvedValue(mockAmenity);

    const req = {
      params: { id: "123" },
      body: {
        name: "Pool",
        description: "A large pool",
        hotel_amenities: ["Hotel 1"],
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await updateAmenity(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockAmenity);
  });

  it("should handle unexpected errors and pass them to the next middleware", async () => {
    const error = new Error("Unexpected error");

    Amenity.findByIdAndUpdate.mockRejectedValue(error);

    const req = {
      params: { id: "123" },
      body: {
        name: "Pool",
        description: "A large pool",
        hotel_amenities: ["Hotel 1"],
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await updateAmenity(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
