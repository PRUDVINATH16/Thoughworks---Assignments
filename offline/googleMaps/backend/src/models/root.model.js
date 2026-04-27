const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({

  locationId: {
    type: String,
    required: true,
    unique: true
  },

  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    },
  },

  status: {
    type: String,
    enum: ['Clear', 'Issue'],
    required: true
  },

  issues: {
    is_muddy: {
      type: Boolean,
      default: true
    },
    is_foolded: {
      type: Boolean,
      default: true
    },
    has_potholes: {
      type: Boolean,
      default: true
    }
  },

  severity: {
    type: String,
    enum: ['None', 'Low', 'Medium', 'High', 'Extreme'],
    default: 'None'
  },

  passable_by: {
    two_wheeler: {
      type: Boolean,
      default: true
    },
    four_wheeler: {
      type: Boolean,
      default: true
    },
    heavy_vehicle: {
      type: Boolean,
      default: true
    }
  },

  image_url: { type: String },

  additional_notes: {
    type: String,
    maxLength: 500
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);