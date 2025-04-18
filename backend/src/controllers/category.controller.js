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
