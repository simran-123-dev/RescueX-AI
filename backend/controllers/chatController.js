const ChatMessage = require('../models/ChatMessage');

exports.getMessages = async (req, res, next) => {
  try {
    const room = req.query.room || 'global';
    const messages = await ChatMessage.find({ room }).sort({ createdAt: 1 }).limit(50).populate('sender', 'name email');
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

exports.createMessage = async (req, res, next) => {
  try {
    const room = req.body.room || 'global';
    const message = await ChatMessage.create({
      room,
      sender: req.user._id,
      text: req.body.text,
    });

    const populated = await ChatMessage.findById(message._id).populate('sender', 'name email');
    res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
};
