const express = require("express");
const router = express.Router();
const {
  userRegister,
  getMe,
  loginUser,
} = require("../controllers/userController");
const { protect } = require("../Midlewares/authMiddleware");

router.post("/", userRegister);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
