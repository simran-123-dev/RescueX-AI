const User = require('../models/User');

exports.getProfile = async (req, res) => {
  res.json(req.user);
};

exports.updateProfile = async (req, res) => {
  const updates = req.body;
  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
  res.json(user);
};
