const mongoose = require('mongoose');

const qrSchema = new mongoose.Schema({
  data: { type: String, required: true },
});

module.exports = mongoose.model('QR', qrSchema);
