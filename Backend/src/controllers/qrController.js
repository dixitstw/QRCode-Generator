const QR = require('../models/qr');

exports.readQR = async (req, res) => {
  try {
    const qrId = req.params.id;
    const qr = await QR.findById(qrId);
    if (!qr) {
      return res.status(404).json({ message: 'QR code not found.' });
    }
    return res.status(200).json({ qr });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
