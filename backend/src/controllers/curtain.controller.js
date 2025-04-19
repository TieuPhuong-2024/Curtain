const Curtain = require('../models/curtain.model');

// Get all curtains
exports.getAllCurtains = async (req, res) => {
  try {
    const curtains = await Curtain.find().populate('category');
    res.status(200).json(curtains);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single curtain
exports.getCurtainById = async (req, res) => {
  try {
    const curtain = await Curtain.findById(req.params.id).populate('category');
    if (!curtain) {
      return res.status(404).json({ message: 'Curtain not found' });
    }
    res.status(200).json(curtain);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new curtain
exports.createCurtain = async (req, res) => {
  try {
    const newCurtain = new Curtain(req.body);
    const savedCurtain = await newCurtain.save();
    res.status(201).json(savedCurtain);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a curtain
exports.updateCurtain = async (req, res) => {
  try {
    const updatedCurtain = await Curtain.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedCurtain) {
      return res.status(404).json({ message: 'Curtain not found' });
    }
    
    res.status(200).json(updatedCurtain);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a curtain
exports.deleteCurtain = async (req, res) => {
  try {
    const curtain = await Curtain.findByIdAndDelete(req.params.id);
    
    if (!curtain) {
      return res.status(404).json({ message: 'Curtain not found' });
    }
    
    res.status(200).json({ message: 'Curtain deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 