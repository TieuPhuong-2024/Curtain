const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: Object, // For BlockNote rich text content
    required: true
  },
  summary: {
    type: String,
    trim: true
  },
  authorId: {
    type: String,
    required: true
  },
  featuredImage: {
    type: String,
    default: null
  },
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  viewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('Post', postSchema); 