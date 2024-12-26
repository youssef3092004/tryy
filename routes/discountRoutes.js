const { Router } = require("express");
const {
  getDiscounts,
  getDiscount,
  createDiscount,
  updateDiscount,
  deleteDiscount,
} = require("../controllers/discountController");

const router = Router();

router.get("/", getDiscounts);
router.get("/:id", getDiscount);
router.post("/", createDiscount);
router.put("/:id", updateDiscount);
router.delete("/:id", deleteDiscount);

module.exports = router;
