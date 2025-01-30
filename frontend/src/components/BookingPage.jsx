import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../App";
import PlaceGallery from "./PlaceGallery";
import { UserContext } from "../utilis/UserContext";
import AllPhotos from "./AllPhotos";
import AddressLink from "./AddressLink";
import BookingDates from "./BookingDates";

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const { showPhotos, setShowPhotos } = useContext(UserContext);
  // console.log(id)
  useEffect(() => {
    if (id) {
      axiosInstance.get("/bookings").then(({ data }) => {
        const foundBooking = data.find(({ _id }) => id === _id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return;
  }

  if (showPhotos) {
    return <AllPhotos setShowPhotos={setShowPhotos} place={booking?.place} />;
  }

  return (
    <div className="mt-8">
      <h1 className="text-2xl">{booking?.place?.title}</h1>
      <AddressLink place={booking.place} />
      <div className="bg-gray-300 p-6 rounded-xl mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl">Your booking information</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary text-white p-6 rounded-2xl shadow shadow-black shadow-md">
            <h2>Total price</h2>
            <p className="text-2xl">GHS{booking?.price}</p>
        </div>
      </div>
      <PlaceGallery
        place={booking.place}
        showPhotos={showPhotos}
        setShowPhotos={setShowPhotos}
      />
    </div>
  );
};

export default BookingPage;
