const express = require('express');
const router = express.Router();
const { createEmergency, getEmergencies, getStatistics } = require('../controllers/emergencyController');

router.post('/', createEmergency);
router.get('/', getEmergencies);
router.get('/stats', getStatistics);

module.exports = router;
