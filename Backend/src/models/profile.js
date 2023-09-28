const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  type: { type: String, enum: ['Personal', 'Organization'], required: true },
  name: { type: String, required: true },
   email: { type: String, unique: true, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  website: { type: String, required: true },
  qr: { type: mongoose.Schema.Types.ObjectId, ref: 'QR' },
});

module.exports = mongoose.model('Profile', profileSchema);
