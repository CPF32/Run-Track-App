const mongoose = require('mongoose')

const runSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  pace: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Run', runSchema)
