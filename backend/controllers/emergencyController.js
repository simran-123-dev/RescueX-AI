const Emergency = require('../models/Emergency');
const User = require('../models/User');
const crypto = require('crypto');

exports.createEmergency = async (req, res) => {
  try {
    const { coordinates, type, description, severity } = req.body;

    if (!req.user?._id) {
      return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }

    if (
      !Array.isArray(coordinates) ||
      coordinates.length !== 2 ||
      coordinates.some((value) => typeof value !== 'number' || Number.isNaN(value))
    ) {
      return res.status(400).json({
        success: false,
        message: 'Valid coordinates are required as [longitude, latitude]'
      });
    }

    const emergencyId = `RX-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    const emergency = await Emergency.create({
      user: req.user._id,
      location: { type: 'Point', coordinates },
      type: type || 'medical',
      description,
      severity: severity || 'critical',
      emergencyId
    });

    let nearbyVolunteers = [];
    try {
      nearbyVolunteers = await User.find({
        role: 'volunteer',
        location: { $nearSphere: { $geometry: { type: 'Point', coordinates }, $maxDistance: 10000 } }
      }).limit(10);
    } catch (nearbyError) {
      console.error('Nearby volunteer lookup failed:', nearbyError);
    }

    res.status(201).json({ success: true, emergency, volunteers: nearbyVolunteers });
  } catch (err) {
    console.error('Create emergency failed:', err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.getEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find({ user: req.user._id }).sort('-createdAt').limit(20);
    res.json(emergencies);
  } catch (err) {
    console.error('Get emergencies failed:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getStatistics = async (req, res) => {
  try {
    const total = await Emergency.countDocuments();
    const resolved = await Emergency.countDocuments({ status: 'resolved' });
    const pending = await Emergency.countDocuments({ status: 'pending' });
    res.json({ total, resolved, pending, responseRate: 92, averageTime: 7.6 });
  } catch (err) {
    console.error('Get emergency statistics failed:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};
