import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import { readProfile, updateProfile } from '../api';

function UpdateProfile() {
  const { id } = useParams(); 

  const [formData, setFormData] = useState({
    type: '',
    name: '',
    email: '',
    address: '',
    contact: '',
    website: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await readProfile(id);
        if (response.profile) {
          setFormData(response.profile);
        } else {
          console.error('Profile not found');
        }
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfile(id, formData);
      alert('Profile updated successfully');
      window.location.href = `/view/${id}`;
      if (response.message === 'Profile updated successfully') {
        
        console.log(response);
      } else {
        console.error('Profile update failed');
      }
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type:</label>
          <input
            type="text"
            className="form-control"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact" className="form-label">Contact:</label>
          <input
            type="text"
            className="form-control"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="website" className="form-label">Website:</label>
          <input
            type="url"
            className="form-control"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">Update Profile</button>
        </div>
        <div className="mb-3">
          <Link to={`/view/${id}`} className="btn btn-secondary">Back to Profile</Link>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfile;
