import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import { readProfile } from '../api';

function ViewProfile() {
  const { id } = useParams(); 

  const [profile, setProfile] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await readProfile(id); 
        if (response.profile) {
          setProfile(response.profile);
        } else {
          console.error('Profile not found');
        }
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    fetchProfile();
  }, [id]);

  const handleViewProfile = () => {
    setShowProfile(true);
  };

  return (
    <div>
      <h2>View Profile</h2>
      {showProfile ? (
        <div>
          <p>Type: {profile?.type}</p>
          <p>Name: {profile?.name}</p>
          <p>Email: {profile?.email}</p>
          <p>Address: {profile?.address}</p>
          <p>Contact: {profile?.contact}</p>
          <p>Website: {profile?.website}</p>

          <div>
       <Link to={`/viewqr/${id}`}>
            <button className="btn btn-primary ">View QR Code</button>
          </Link>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={handleViewProfile} className="btn btn-primary">View Profile</button>
        </div>
      )}

    </div>
  );
}

export default ViewProfile;
