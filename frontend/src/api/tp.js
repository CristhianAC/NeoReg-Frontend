import { uploadPhoto, getPhotos, getPhoto, deletePhoto } from './photosApi.js';

const test = async () => {
  const personId = '3';
  const filename = 'example.jpg';

  // Test getPhotos
  try {
    const photos = await getPhotos(personId);
    console.log('Photos:', photos);
  } catch (err) {
    console.error('getPhotos failed:', err);
  }

  // Test getPhoto
  try {
    const photo = await getPhoto(personId, filename);
    console.log('Photo:', photo);
  } catch (err) {
    console.error('getPhoto failed:', err);
  }

  // Test deletePhoto
  try {
    const photos = await getPhotos(personId)
    const daphoto = photos.at(-1).filename // photo filename
    const deleted = await deletePhoto(personId, daphoto);
    console.log('Deleted:', deleted);
  } catch (err) {
    console.error('deletePhoto failed:', err);
  }

  //Test uploadPhoto
  // try {
  //   const file = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
  //   const uploaded = await uploadPhoto(personId, file);
  //   console.log('Uploaded:', uploaded);
  // } catch (err) {
  //   console.error('uploadPhoto failed:', err);
  // }
};

test();
