const express = require("express");
const router = express.Router();

const {
  firstAid,
  healthScan,
} = require("../controllers/aiController");

router.post("/first-aid", firstAid);
router.post("/health-scan", healthScan);

module.exports = router;