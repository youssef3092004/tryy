const { describe, it, expect } = require("@jest/globals");
const { getAmenity } = require("../../controllers/amenityController");
const Amenity = require("../../models/ameniyModel");

jest.mock("../../models/ameniyModel");

describe("getAmenity Controller", () => {
  it("should return a 404 error if the amenity is not found", async () => {
    Amenity.findById.mockResolvedValue(null);

    const req = {
      params: { id: "123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await getAmenity(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "There are no amenities available",
    });
  });

  it("should return a 200 status and the amenity if found", async () => {
    const mockAmenity = {
      _id: "123",
      name: "Pool",
      hotel_amenities: [{ name: "Hotel 1" }],
    };

    Amenity.findById.mockResolvedValue(mockAmenity);

    const req = {
      params: { id: "123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await getAmenity(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockAmenity);
  });
});
