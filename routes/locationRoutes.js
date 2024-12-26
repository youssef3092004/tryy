const { Router } = require("express");

const {
  getLocation,
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation,
} = require("../controllers/locationController");

const router = Router();

router.get("/", getLocations);
router.get("/:id", getLocation);
router.post("/", createLocation);
router.put("/:id", updateLocation);
router.delete("/:id", deleteLocation);

module.exports = router;
