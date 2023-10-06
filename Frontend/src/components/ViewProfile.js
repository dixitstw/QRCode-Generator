import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom'; 

import { readProfile } from '../api'; 

function ViewProfile() {
  const { id } = useParams(); 

  const [profile, setProfile] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const handleViewProfileClick = async () => {
    try {
      const result = await readProfile(id); 
      setProfile(result);
      setShowProfile(true);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  return (
    <div>
      <h2>This is the View Pofile Page!</h2>
      <button onClick={handleViewProfileClick} className="btn btn-primary">View Profile</button>
      {showProfile && (
        <div>
          <h2>Profile Details</h2>
          <p>Type: {profile.type}</p>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Address: {profile.address}</p>
          <p>Contact: {profile.contact}</p>
          <p>Website: {profile.website}</p>

          <Link to={`/update/${id}`}>
            <button className='btn btn-primary'>Update Profile</button>
          </Link>

          <Link to={`/createqr/${id}`}>
            <button className='btn btn-primary'>Generate QR code</button>
          </Link>
        </div>
        
      )}
    </div>
  );
}

export default ViewProfile;
