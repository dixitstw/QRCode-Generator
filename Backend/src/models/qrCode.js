const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
  type: String,
  name: String,
  email: String,
  address: String,
  contact: String,
  website: String,
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PersonalProfile', // Reference to Personal Profile
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrganizationProfile', // Reference to Organization Profile
  },
});

const QRCode = mongoose.model('QRCode', qrCodeSchema);

module.exports = QRCode;
