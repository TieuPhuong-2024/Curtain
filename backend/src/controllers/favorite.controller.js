const Favorite = require('../models/favorite.model');
const Curtain = require('../models/curtain.model');

// Get all favorite products for a user
exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user._id;
    const favorites = await Favorite.find({ user: userId }).populate('product');
    res.json(favorites.map(fav => fav.product));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add product to favorites
exports.addFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;
    const favorite = await Favorite.findOneAndUpdate(
      { user: userId, product: productId },
      {},
      { upsert: true, new: true }
    );
    res.json({ success: true, favorite });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove product from favorites
exports.removeFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;
    await Favorite.findOneAndDelete({ user: userId, product: productId });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get favorite count for a product
exports.getFavoriteCount = async (req, res) => {
  try {
    const { productId } = req.params;
    const count = await Favorite.countDocuments({ product: productId });
    res.json({ productId, count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
