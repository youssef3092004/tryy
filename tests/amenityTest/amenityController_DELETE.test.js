const { describe, it, expect } = require("@jest/globals");
const { deleteAmenity } = require("../../controllers/amenityController");
const Amenity = require("../../models/ameniyModel");

jest.mock("../../models/ameniyModel");

describe("deleteAmenity Controller", () => {
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

    await deleteAmenity(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "There is no amenity by this ID",
    });
  });

  it("should return a 200 status and a success message if the amenity is found and deleted", async () => {
    const mockAmenity = {
      _id: "123",
      name: "Pool",
      description: "A large pool",
      remove: jest.fn().mockResolvedValue(true),
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

    await deleteAmenity(req, res, next);

    expect(mockAmenity.remove).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Amenity removed",
    });
  });

  it("should handle unexpected errors and pass them to the next middleware", async () => {
    const error = new Error("Unexpected error");

    Amenity.findById.mockRejectedValue(error);

    const req = {
      params: { id: "123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await deleteAmenity(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
