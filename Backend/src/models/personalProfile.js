const mongoose = require('mongoose');

const personalProfileSchema = new mongoose.Schema({
  type: String,
  name: String,
  email: {
    type: String,
    unique: true, // Ensure email uniqueness
  },
  address: String,
  contact: String,
  website: String,
  qrCodes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QRCode', // Reference to QR Codes
  }],
});

const PersonalProfile = mongoose.model('PersonalProfile', personalProfileSchema);

module.exports = PersonalProfile;
