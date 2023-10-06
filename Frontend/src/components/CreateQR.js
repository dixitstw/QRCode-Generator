import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode'; // Import the qrcode library
import { readProfile } from '../api'; // Import your API function to read the profile


function CreateQR() {
const { id } = useParams(); // Get the profile ID from the route parameter


const [profile, setProfile] = useState(null);
const [qrData, setQRData] = useState('');


useEffect(() => {
// Fetch the profile data by ID when the component mounts
async function fetchProfile() {
try {
const result = await readProfile(id); // Call your API function to read the profile by ID
setProfile(result);
} catch (error) {
console.error('Error fetching profile:', error);
}
}


fetchProfile();
}, [id]);


useEffect(() => {
// Generate QR code data based on the profile information
if (profile) {
const qrProfileData = {
type: profile.type,
name: profile.name,
email: profile.email,
address: profile.address,
contact: profile.contact,
website: profile.website,
};


const qrCodeData = JSON.stringify(qrProfileData);
QRCode.toDataURL(qrCodeData, (err, url) => {
  if (err) {
  console.error('Error generating QR code:', err);
  } else {
  setQRData(url);
  }
  });
  }
  }, [profile]);
  
  
  return (
  <div>
  {profile ? (
  <div>
  <h2>Profile Details</h2>
  <p>Name: {profile.name}</p>
  <p>Email: {profile.email}</p>
  <p>Address: {profile.address}</p>
  <p>Contact: {profile.contact}</p>
  <p>Website: {profile.website}</p>
  
  
  </div>
  ) : (
  <p>Loading...</p>
  )}
  
  
  {qrData && (
  <div>
  <h2>QR Code</h2>
  <img src={qrData} alt="QR Code" />
  </div>
)}
</div>
);
}


export default CreateQR;


  