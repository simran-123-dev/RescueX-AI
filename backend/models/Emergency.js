const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  type: { type: String, default: 'medical' },
  status: { type: String, enum: ['pending', 'accepted', 'resolved'], default: 'pending' },
  severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'high' },
  nearestHospital: { type: String },
  nearestAmbulance: { type: String },
  emergencyId: { type: String, required: true, unique: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

emergencySchema.index({ location: '2dsphere' });
module.exports = mongoose.model('Emergency', emergencySchema);
