const Color = require('../models/color.model');

// Get all colors
exports.getAllColors = async (req, res) => {
  try {
    const colors = await Color.find().sort({ name: 1 }); // Sort by name
    res.status(200).json(colors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Optional: Create a new color (if you want to manage colors via API)
exports.createColor = async (req, res) => {
  const { name, hexCode } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Color name is required.' });
  }
  try {
    const existingColor = await Color.findOne({ name });
    if (existingColor) {
      return res.status(400).json({ message: 'Color with this name already exists.' });
    }
    const newColor = new Color({ name, hexCode });
    const savedColor = await newColor.save();
    res.status(201).json(savedColor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add other CRUD operations (getColorById, updateColor, deleteColor) as needed.
