import React, { useState } from 'react'

const PlaceGallery = ({place, setShowPhotos}) => {    
  return (
    <div className="grid grid-cols-[2fr_1fr] gap-2 relative rounded-3xl overflow-hidden">
        <div>
          <div>
            <img
              src={`https://booking-app-backend-259f.onrender.com/${place?.photos[0]}`}
              alt=""
              className="aspect-square object-cover cursor-pointer"
              onClick={() => setShowPhotos(true)}
            />
          </div>
        </div>
        <div>
          <div>
            <img
              src={`https://booking-app-backend-259f.onrender.com/${place?.photos[1]}`}
              alt=""
              className="aspect-square object-cover cursor-pointer"
              onClick={() => setShowPhotos(true)}
            />
          </div>
          <div className="overflow-hidden">
            <img
              src={`https://booking-app-backend-259f.onrender.com/${place?.photos[2]}`}
              alt=""
              className="aspect-square object-cover relative top-2 cursor-pointer"
              onClick={() => setShowPhotos(true)}
            />
          </div>
        </div>
        <button
          className="absolute mr-4 bottom-2 right-2 bg-white px-2 py-2 font-semibold rounded-xl border shadow shadow-md shadow-gray-500 flex gap-1"
          onClick={() => setShowPhotos(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          Show more photos
        </button>
      </div>

  )
}

export default PlaceGallery
