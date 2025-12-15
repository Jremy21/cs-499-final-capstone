// app_api/routes/index.js
const express = require('express');
const router = express.Router();

// ✅ Make sure this path/filename matches your controllers file
//    (should be app_api/controllers/trips.js)
const tripsCtrl = require('../controllers/trips');

// Trips API
router.get('/trips', tripsCtrl.tripsList);
router.get('/trips/:tripCode', tripsCtrl.tripsFindByCode);
router.post('/trips', tripsCtrl.tripsAddTrip);
router.put('/trips/:tripCode', tripsCtrl.tripsUpdateTrip);

// Optional sanity check
router.get('/status', (_req, res) => res.json({ ok: true }));

module.exports = router;
