import React, { useState, } from 'react';
import { createProfile } from '../api';

function CreateProfileForm() {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    email: '',
    address: '',
    contact: '',
    website: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createProfile(formData);
      const createdProfileId = response._id;
      alert('Profile created successfully');
      window.location.href = `/view/${createdProfileId}`;
      if (response.message === 'Profile created successfully') {
        setFormData({
            type: '',
            name: '',
            email: '',
            address: '',
            contact: '',
            website: '',
          });
       
        console.log(response);
      } else {
        console.error('Profile creation failed');
      }
    } catch (error) {
      console.error('Error creating profile', error);
    }
  };

  return (
    <div className="container">
      <h2>Create Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Type:</label>
          <input type="text" className="form-control" name="type" value={formData.type} onChange={handleChange} required/>
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required/>
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required/>
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required/>
        </div>
        <div className="form-group">
          <label>Contact:</label>
          <input type="text" className="form-control" name="contact" value={formData.contact} onChange={handleChange} required/>
        </div>
        <div className="form-group">
          <label>Website:</label>
          <input type="url" className="form-control" name="website" value={formData.website} onChange={handleChange} required/>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Create Profile</button>
        </div>
      </form>
    </div>
  );
}

export default CreateProfileForm;
