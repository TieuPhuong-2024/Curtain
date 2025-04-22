const Favorite = require('../models/favorite.model');
const Curtain = require('../models/curtain.model');

// Get all favorite products for a user
exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user._id;
    const favorites = await Favorite.find({ user: userId })
      .populate('product')
      .lean();
    
    // Transform data to include both favorite and product info
    const transformedData = favorites.map(fav => ({
      _id: fav.product._id,
      ...fav.product,
      favoriteId: fav._id,
      createdAt: fav.createdAt
    }));
    
    res.json({ success: true, data: transformedData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add product to favorites
exports.addFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    // Check if product exists
    const product = await Curtain.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const favorite = await Favorite.findOneAndUpdate(
      { user: userId, product: productId },
      { user: userId, product: productId },
      { upsert: true, new: true }
    );

    res.json({ success: true, data: favorite });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove product from favorites
exports.removeFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;
    
    const result = await Favorite.findOneAndDelete({ user: userId, product: productId });
    if (!result) {
      return res.status(404).json({ error: 'Favorite not found' });
    }
    
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
    res.json({ success: true, data: { productId, count } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
