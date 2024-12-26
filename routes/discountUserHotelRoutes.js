const { Router } = require("express");
const {
  getDiscountUserHotels,
  getDiscountUserHotel,
  createDiscountUserHotel,
  updateDiscountUserHotel,
  deleteDiscountUserHotel,
} = require("../controllers/discountUserHotelController");

const router = Router();

router.get("/", getDiscountUserHotels);
router.get("/:id", getDiscountUserHotel);
router.post("/", createDiscountUserHotel);
router.put("/:id", updateDiscountUserHotel);
router.delete("/:id", deleteDiscountUserHotel);

module.exports = router;
