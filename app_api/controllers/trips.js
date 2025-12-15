const mongoose = require('mongoose');
const Trip = mongoose.models.Trip || mongoose.model('Trip');

/**
 * GET /api/trips
 * Return ALL trips as a plain array.
 */
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find().lean();
    return res.status(200).json(trips); // array
  } catch (err) {
    console.error('tripsList error:', err);
    return res.status(500).json({ message: 'Error fetching trips', error: err.message });
  }
};

/**
 * GET /api/trips/:tripCode
 * Return trip(s) by code as an ARRAY (so client can use value[0]).
 */
const tripsFindByCode = async (req, res) => {
  try {
    const { tripCode } = req.params;
    const docs = await Trip.find({ code: tripCode }).lean(); // array
    if (!docs || docs.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    return res.status(200).json(docs);
  } catch (err) {
    console.error('tripsFindByCode error:', err);
    return res.status(500).json({ message: 'Error fetching trip', error: err.message });
  }
};

/**
 * POST /api/trips
 * Create a new trip.
 */
const tripsAddTrip = async (req, res) => {
  try {
    const trip = await Trip.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });
    return res.status(201).json(trip);
  } catch (err) {
    console.error('tripsAddTrip error:', err);
    return res.status(400).json({
      message: 'Validation error',
      error: err.message || err
    });
  }
};

/**
 * PUT /api/trips/:tripCode
 * Update a trip by code.
 */
const tripsUpdateTrip = async (req, res) => {
  try {
    const { tripCode } = req.params;

    const updated = await Trip.findOneAndUpdate(
      { code: tripCode },
      {
        $set: {
          ...(req.body.name        !== undefined && { name: req.body.name }),
          ...(req.body.length      !== undefined && { length: req.body.length }),
          ...(req.body.start       !== undefined && { start: req.body.start }),
          ...(req.body.resort      !== undefined && { resort: req.body.resort }),
          ...(req.body.perPerson   !== undefined && { perPerson: req.body.perPerson }),
          ...(req.body.image       !== undefined && { image: req.body.image }),
          ...(req.body.description !== undefined && { description: req.body.description })
        }
      },
      { new: true, runValidators: true, lean: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    return res.status(200).json(updated);
  } catch (err) {
    console.error('tripsUpdateTrip error:', err);
    return res.status(400).json({
      message: 'Update failed',
      error: err.message || err
    });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip
};
