// app_api/routes/index.js
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const tripsCtrl = require('../controllers/trips');
const authController = require('../controllers/authentication');

// JWT authentication middleware
function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.auth = decoded;
    next();
  });
}

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Trips routes
router.get('/trips', tripsCtrl.tripsList);
router.get('/trips/:tripCode', tripsCtrl.tripsFindByCode);
router.post('/trips', authenticateJWT, tripsCtrl.tripsAddTrip);
router.put('/trips/:tripCode', authenticateJWT, tripsCtrl.tripsUpdateTrip);

// Sanity check
router.get('/status', (_req, res) => res.json({ ok: true }));

module.exports = router;
