const { describe, it, expect } = require("@jest/globals");
const { createAmenity } = require("../../controllers/amenityController");
const Amenity = require("../../models/ameniyModel");

jest.mock("../../models/ameniyModel");

describe("createAmenity Controller", () => {
  it("should return a 400 error if any required field is missing", async () => {
    const req = {
      body: { name: "Pool", description: "" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await createAmenity(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Description is required",
    });
  });

  it("should return a 201 status and the created amenity if all fields are provided", async () => {
    const mockAmenity = {
      _id: "123",
      name: "Pool",
      description: "A large pool",
      hotel_amenities: ["Hotel 1"],
    };

    Amenity.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(mockAmenity),
    }));

    const req = {
      body: mockAmenity,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await createAmenity(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockAmenity);
  });

  it("should handle unexpected errors and pass them to the next middleware", async () => {
    const error = new Error("Unexpected error");

    Amenity.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(error),
    }));

    const req = {
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

    await createAmenity(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
