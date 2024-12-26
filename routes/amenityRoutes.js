const { Router } = require("express");

const {
  getAmenities,
  getAmenity,
  createAmenity,
  updateAmenity,
  deleteAmenity,
} = require("../controllers/amenityController");

const router = Router();

router.get("/", getAmenities);
router.get("/:id", getAmenity);
router.post("/", createAmenity);
router.put("/:id", updateAmenity);
router.delete("/:id", deleteAmenity);

module.exports = router;
