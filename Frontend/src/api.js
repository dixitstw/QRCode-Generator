const BASE_URL = 'http://localhost:5000/api'; 

export async function createProfile(profileData) {
  const response = await fetch(`${BASE_URL}/profiles/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
  });
  return await response.json();
}

export async function readProfile(profileId) {
  const response = await fetch(`${BASE_URL}/profiles/read/${profileId}`);
  return await response.json();
}

export async function updateProfile(profileId, profileData) {
  const response = await fetch(`${BASE_URL}/profiles/update/${profileId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
  });
  return await response.json();
}

export async function readQR(qrId) {
  const response = await fetch(`${BASE_URL}/qrs/read/${qrId}`);
  return await response.json();
}
