const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  text: {
    type: String,
    required: true
  },
  // This is a counter for the number of times the note has been updated
  updatedCount: {
    type: Number,
    default: 0
  }
}, 
{
  timestamps: true // This adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('Note', noteSchema);