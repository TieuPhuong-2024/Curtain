const Curtain = require('../models/curtain.model');

// Lấy danh sách category từ enum của model Curtain
exports.getCategories = (req, res) => {
  try {
    const categories = Curtain.schema.path('category').enumValues;
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Không thể lấy danh mục sản phẩm', error: error.message });
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const newCategory = new Curtain(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Không thể tạo danh mục sản phẩm', error: error.message });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Curtain.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Không thể cập nhật danh mục sản phẩm', error: error.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Curtain.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

