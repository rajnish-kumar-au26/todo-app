const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/check-token", authMiddleware, (req, res) => {
  return res
    .status(200)
    .json({ isAuthenticated: true, message: "Token is valid" });
});

module.exports = router;
