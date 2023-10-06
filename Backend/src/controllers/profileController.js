const PersonalProfile = require('../models/personalProfile');
const OrganizationProfile = require('../models/organizationProfile');

exports.createProfile = async (req, res) => {
  try {
    const { type, name, email, address, contact, website } = req.body;

    if (type === 'Personal') {
      const personalProfile = new PersonalProfile({ type, name, email, address, contact, website });
      await personalProfile.save();
      res.status(201).json(personalProfile);
    } else if (type === 'Organization') {
      const organizationProfile = new OrganizationProfile({ type, name, email, address, contact, website });
      await organizationProfile.save();

      res.status(201).json(organizationProfile);
    } else {
      res.status(400).json({ error: 'Invalid profile type' });
    }

    if (type === 'Organization' && req.body.personalProfileId) {
      const organizationProfile = await OrganizationProfile.findById(organizationProfile._id);
      if (organizationProfile) {
        organizationProfile.employees.push(personalProfile._id);
        await organizationProfile.save();
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.readProfile = async (req, res) => {
  try {
    const profileId = req.params.id;

    const personalProfile = await PersonalProfile.findById(profileId);
    if (personalProfile) {
      return res.status(200).json(personalProfile);
    }

    const organizationProfile = await OrganizationProfile.findById(profileId);
    if (organizationProfile) {
      return res.status(200).json(organizationProfile);
    }

    res.status(404).json({ error: 'Profile not found' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const profileId = req.params.id;
    const { type, name, email, address, contact, website } = req.body;

    let profile;

    const personalProfile = await PersonalProfile.findById(profileId);
    if (personalProfile) {
      profile = personalProfile;
    } else {
      const organizationProfile = await OrganizationProfile.findById(profileId);
      if (organizationProfile) {
        profile = organizationProfile;
      } else {
        return res.status(404).json({ error: 'Profile not found' });
      }
    }
    
    if (type) profile.name = type;
    if (name) profile.name = name;
    if (email) profile.email = email;
    if (address) profile.address = address;
    if (contact) profile.contact = contact;
    if (website) profile.website = website;

    await profile.save();
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
