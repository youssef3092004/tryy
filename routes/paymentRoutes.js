const { Router } = require("express");
const {
  createPayment,
  getPayments,
  getPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/paymentController");

const router = Router();

router.get("/", getPayments);
router.get("/:id", getPayment);
router.post("/", createPayment);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;
