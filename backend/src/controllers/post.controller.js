const Post = require('../models/post.model');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    // Extract user info from the authenticated request
    const authorId = req.user.uid;

    // Create new post with author info from Firebase authentication
    const newPost = new Post({
      ...req.body,
      authorId
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const { status, tag, limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    
    // Build query based on filters
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (tag) {
      query.tags = tag;
    }
    
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
      
    const total = await Post.countDocuments(query);
    
    res.status(200).json({
      posts,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Increment view count
    post.viewCount += 1;
    await post.save();
    
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if user is the author
    if (post.authorId !== req.user.uid) {
      return res.status(403).json({ message: 'You are not authorized to update this post' });
    }
    
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if user is the author
    if (post.authorId !== req.user.uid) {
      return res.status(403).json({ message: 'You are not authorized to delete this post' });
    }
    
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 