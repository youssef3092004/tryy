const { Router } = require("express");
const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const router = Router();

router.get("/", getReviews);
router.get("/:id", getReview);
router.post("/", createReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

module.exports = router;
