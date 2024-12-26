const { Router } = require("express");

const {
  getHotel,
  getHotels,
  createHotel,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotelController");

const router = Router();

router.get("/", getHotels);
router.get("/:id", getHotel);
router.post("/".createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);

module.exports = router;
