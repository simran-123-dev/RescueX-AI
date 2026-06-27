const mongoose = require('mongoose');

const bloodDonorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bloodGroup: { type: String, required: true },
  available: { type: Boolean, default: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  lastDonatedAt: { type: Date }
});

bloodDonorSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('BloodDonor', bloodDonorSchema);
