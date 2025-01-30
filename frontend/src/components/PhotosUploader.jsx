import React from 'react'
import { axiosInstance } from '../App';
const PhotosUploader = ({photoLink, setPhotoLink, addedPhotos, setAddedPhotos}) => {
    async function uploadLink(e) {
        e.preventDefault();
        const { data } = await axiosInstance.post("/upload-link", {
          link: photoLink,
        });
        setAddedPhotos((prev) => [...prev, data]);
        setPhotoLink("");
      }
    
  return (
    <div className="flex">
    <input
      type="text"
      placeholder="Add using a link ...jpg"
      value={photoLink}
      onChange={(e) => setPhotoLink(e.target.value)}
    />
    <button
      className="bg-gray-200 p-4 rounded-2xl"
      onClick={uploadLink}
    >
      Add&nbsp;photo
    </button>
  </div>
  )
}

export default PhotosUploader