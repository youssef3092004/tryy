const { describe, it, expect } = require("@jest/globals");
const { getAmenities } = require("../../controllers/amenityController");
const Amenity = require("../../models/ameniyModel");

jest.mock("../../models/ameniyModel");

describe("getAmenities Controller", () => {
  it("should return a 404 error if no amenities are found", async () => {
    Amenity.find.mockResolvedValue([]);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await getAmenities(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "There are no amenities available",
    });
  });

  it("should return a 200 status and the amenities if found", async () => {
    const mockAmenities = [
      { _id: "1", name: "Pool" },
      { _id: "2", name: "Gym" },
    ];

    Amenity.find.mockResolvedValue(mockAmenities);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await getAmenities(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockAmenities);
  });

  it("should handle unexpected errors and pass them to the next middleware", async () => {
    const error = new Error("Unexpected error");

    Amenity.find.mockRejectedValue(error);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await getAmenities(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
