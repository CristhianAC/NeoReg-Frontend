import { API_base } from './config.js';

export async function uploadPhoto(id, file) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_base}/photos/upload/${id}`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Error uploading photo: ${response.statusText}`);
    }
    return response.json();
  } catch (err) {
    console.error(`Error: ${err}`);
    throw err; // Re-throw to handle it in the calling code
  }
}
export async function getPhotos(id) {
  const response = await fetch(`${API_base}/photos/person/${id}`);
  if (!response.ok) {
    throw new Error(`Error fetching photos: ${response.status} ${response.statusText}`);
  };
  return response.json();
}
export async function getPhoto(id, filename) {
  const response = await fetch(`${API_base}/photos/person/${id}/${filename}`);
  if (!response.ok) {
    throw new Error(`Error fetching photo: ${response.status} ${response.statusText}`);
  };
  return response.json();
}
export async function deletePhoto(id, filename) {
  const response = await fetch(`${API_base}/photos/person/${id}/${filename}`, {
    method: "DELETE"
  });
  if (!response.ok){
    throw new Error(`Error deleting photo: ${response.status} ${response.statusText}`);
  };
  return response.json();
}