const Profile = require('../models/profile');
const QR = require('../models/qr');
const qrcode = require('qrcode');
const uniqid = require('uniqid');

exports.createProfile = async (req, res) => {
  try {
    const { type, name, email, address, contact, website } = req.body;

    if (type === 'Organization') {
      const existingProfile = await Profile.findOne({ type: 'Organization' });
      if (existingProfile) {
        return res.status(400).json({ message: 'An organization profile already exists.' });
      }
    }

    const qrCodeFilename = uniqid() + '.png';
    
    //Generate qr code
    const qrCodeData = `${type}\n${name}\n${email}\n${address}\n${contact}\n${website}`;
    await qrcode.toFile(`files/${qrCodeFilename}`, qrCodeData);

    // Create a new QR record
    const qr = new QR({ data: qrCodeData });
    await qr.save();

    const profile = new Profile({
      type,
      name,
      email,
      address,
      contact,
      website,
      qr: qr._id,
    });
    await profile.save();

    return res.status(201).json({ message: 'Profile created successfully.'});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.readProfile = async (req, res) => {
  try {
    const profileId = req.params.id;
    const profile = await Profile.findById(profileId).populate('qr');
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found.' });
    }
    return res.status(200).json({ profile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const profileId = req.params.id;
    const { type, name, email, address, contact, website } = req.body;

    if (type === 'Organization') {
      const existingProfile = await Profile.findOne({ type: 'Organization', _id: { $ne: profileId } });
      if (existingProfile) {
        return res.status(400).json({ message: 'An organization profile already exists.' });
      }
    }

    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found.' });
    }

    // Generate a new QR code with updated data
    const qrCodeData = `${type}\n${name}\n${email}\n${address}\n${contact}\n${website}`;
    await qrcode.toFile(`files/${profile.qr}.png`, qrCodeData);


    profile.type = type;
    profile.name = name;
    profile.email = email;
    profile.address = address;
    profile.contact = contact;
    profile.website = website;

    await profile.save();

    return res.status(200).json({ message: 'Profile updated successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
