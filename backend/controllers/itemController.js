const { itemValidation } = require("../utils/validation");
const { Item } = require("../config/dbConnect");

// Get Single Item
const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findOne({ where: { id, userId: req.user.id } });
    if (!item) {
      throw Error("Item is not found");
    }

    res.status(200).json({ message: "Item Get Successfully", data: item });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Items for the user
const getItems = async (req, res) => {
  try {
    const items = await Item.findAll({ where: { userId: req.user.id } });
    if (!items) {
      throw Error("Not Found Any Item");
    }
    res
      .status(200)
      .json({ message: "Items AllItems Successfully", data: items });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create Item
const createItem = async (req, res) => {
  try {
    // Validate user input
    const { error } = itemValidation.validate(req.body);
    if (error) {
      throw Error(error.details[0].message);
    }

    const { title, description } = req.body;

    const item = await Item.create({ title, description, userId: req.user.id });
    res.status(201).json({ message: "Item Created successfully", data: item });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Item
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const item = await Item.findOne({ where: { id, userId: req.user.id } });
    if (!item) {
      throw Error("Item is not found");
    }
    item.title = title || item.title;
    item.description = description || item.description;
    const updateItem = await item.save();
    res
      .status(200)
      .json({ message: "Item Updated Successfully", data: updateItem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Item
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findOne({ where: { id, userId: req.user.id } });
    if (!item) {
      throw Error("Item is not found");
    }

    await item.destroy();
    res.status(200).json({ message: "Item Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getItem, getItems, createItem, updateItem, deleteItem };
