const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'volunteer', 'admin'], default: 'user' },
  phone: { type: String },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  },
  bloodGroup: { type: String },
  allergies: { type: String },
  conditions: { type: String },
  medicines: { type: String },
  emergencyContacts: [{ name: String, phone: String, relation: String }],
  points: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

userSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('User', userSchema);
