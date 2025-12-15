const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  code:       { type: String, required: true, unique: true, index: true },
  name:       { type: String, required: true },
  length:     { type: Number, required: true },               
  resort:     { type: String, required: true },
  perPerson:  { type: Number, required: true },               
  image:      { type: String, default: '' },
  description:{ type: String, default: '' }
}, { collection: 'trips' });

module.exports = mongoose.model('Trip', tripSchema);
