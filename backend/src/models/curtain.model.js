const mongoose = require('mongoose');

const curtainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Blackout', 'Sheer', 'Roller', 'Vertical', 'Roman', 'Bamboo', 'Venetian', 'Honeycomb']
  },
  material: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  size: {
    width: {
      type: Number,
      required: true,
      min: 0
    },
    height: {
      type: Number,
      required: true,
      min: 0
    }
  },
  image: {
    type: String,
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Curtain = mongoose.model('Curtain', curtainSchema);

module.exports = Curtain; 