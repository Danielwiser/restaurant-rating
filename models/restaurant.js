const mongoose = require('mongoose')

const RestaurantSchema = new mongoose.Schema({
  googleId: {
    type: String,
    trim: true

  },
  body: {
    type: String,

  },
  status: {
    type: String,
    default: 'public',
    enum: ['public', 'private'],
   
  },
  user: {
    type: String,
    ref: 'User'
    
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Restaurant', RestaurantSchema)