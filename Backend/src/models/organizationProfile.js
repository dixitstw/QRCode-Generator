const mongoose = require('mongoose');

const organizationProfileSchema = new mongoose.Schema({
  type: String,
  name: String,
  email: {
    type: String,
    unique: true, 
  },
  address: String,
  contact: String,
  website: String,
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PersonalProfile', 
  }],
  qrCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QRCode', 
  },
});

const OrganizationProfile = mongoose.model('OrganizationProfile', organizationProfileSchema);

module.exports = OrganizationProfile;
