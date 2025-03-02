const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getItem,
  getItems,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

router.get("/", authMiddleware, getItems);
router.get("/:id", authMiddleware, getItem);
router.post("/", authMiddleware, createItem);
router.put("/:id", authMiddleware, updateItem);
router.delete("/:id", authMiddleware, deleteItem);

// router.get("/", getItems);
// router.get("/:id", getItem);
// router.post("/", createItem);
// router.put("/:id", updateItem);
// router.delete("/:id", deleteItem);
module.exports = router;
