import React, { useContext, useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import { axiosInstance } from "../App";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import { UserContext } from "../utilis/UserContext";
import AllPhotos from "../components/AllPhotos";
import AddressLink from "../components/AddressLink";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const {showPhotos, setShowPhotos} = useContext(UserContext)
  useEffect(() => {
    if (!id) {
      return;
    }
    axiosInstance.get(`/place/${id}`).then(({ data }) => setPlace(data));
  }, [id]);
  if (showPhotos) {
    return (
      <AllPhotos place={place} setShowPhotos={setShowPhotos}/>
    );

  }

  return (
    <div className="bg-gray-50 -mx-8 mt-4 px-8 py-4">
      <h1 className="text-2xl">{place?.title}</h1>
      <AddressLink place={place}/>
      {/* place gallery */}
      <PlaceGallery place= {place} showPhotos={showPhotos} setShowPhotos={setShowPhotos}/> 
      <div className="mt-8 mb-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place?.description}
          </div>
          <div>
            Check-in: {place?.checkIn} <br />
            Check-out: {place?.checkOut} <br />
            Maximum number of guests: {place?.maxGuests}
          </div>
        </div>
        <BookingWidget place={place}/>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <h2 className="font-semibold text-2xl">Extra info</h2>
        <p className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place?.extraInfo}</p>
      </div>
    </div>
  );
};

export default PlacePage;
