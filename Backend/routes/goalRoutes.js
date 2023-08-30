const express = require("express");
const router = express.Router();
const {
  getGoals,
  updateGoal,
  setGoal,
  deleteGoal,
} = require("../controllers/goalControllers");
const { protect } = require("../Midlewares/authMiddleware");

router.route("/").get(protect, getGoals).post(protect, setGoal);
router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
