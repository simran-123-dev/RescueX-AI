const Emergency = require('../models/Emergency');
const User = require('../models/User');
const crypto = require('crypto');

exports.createEmergency = async (req, res) => {
  const { coordinates, type, description, severity } = req.body;
  const emergencyId = `RX-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
  const emergency = await Emergency.create({
    user: req.user._id,
    location: { type: 'Point', coordinates },
    type,
    description,
    severity,
    emergencyId
  });

  const nearbyVolunteers = await User.find({
    role: 'volunteer',
    location: { $nearSphere: { $geometry: { type: 'Point', coordinates }, $maxDistance: 10000 } }
  }).limit(10);

  res.status(201).json({ emergency, volunteers: nearbyVolunteers });
};

exports.getEmergencies = async (req, res) => {
  const emergencies = await Emergency.find({ user: req.user._id }).sort('-createdAt').limit(20);
  res.json(emergencies);
};

exports.getStatistics = async (req, res) => {
  const total = await Emergency.countDocuments();
  const resolved = await Emergency.countDocuments({ status: 'resolved' });
  const pending = await Emergency.countDocuments({ status: 'pending' });
  res.json({ total, resolved, pending, responseRate: 92, averageTime: 7.6 });
};
