const QRCode = require('../models/qrCode');
const PersonalProfile = require('../models/personalProfile');
const OrganizationProfile = require('../models/organizationProfile');

exports.createQR = async (req, res) => {
  try {
    const { profileType, profileId, type, name, email, address, contact, website } = req.body;

    let profile;
    if (profileType === 'personal') {
      profile = await PersonalProfile.findById(profileId);
      if (!profile) {
        return res.status(404).json({ error: 'Personal Profile not found' });
      }
    } else if (profileType === 'organization') {
      profile = await OrganizationProfile.findById(profileId);
      if (!profile) {
        return res.status(404).json({ error: 'Organization Profile not found' });
      }

      const existingQR = await QRCode.findOne({ profile: profileId });
      if (existingQR) {
        return res.status(400).json({ error: 'Organization Profile already has a QR code' });
      }
    } else {
      return res.status(400).json({ error: 'Invalid profile type' });
    }

    const qrCode = new QRCode({
      profile: profileId,
      type,
      name,
      email,
      address,
      contact,
      website,
    });

    await qrCode.save();
    res.status(201).json(qrCode);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.readQR = async (req, res) => {
  try {
    const qrId = req.params.id;

    const qrCode = await QRCode.findById(qrId);
    if (!qrCode) {
      return res.status(404).json({ error: 'QR Code not found' });
    }

    res.status(200).json(qrCode);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateQR = async (req, res) => {
  try {
    const qrId = req.params.id;
    const { type, name, email, address, contact, website } = req.body;

    const qrCode = await QRCode.findById(qrId);
    if (!qrCode) {
      return res.status(404).json({ error: 'QR Code not found' });
    }
    qrCode.type = type;
    qrCode.name = name;
    qrCode.email = email;
    qrCode.address = address;
    qrCode.contact = contact;
    qrCode.website = website;

    await qrCode.save();
    res.status(200).json({ message: 'QR Code updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};