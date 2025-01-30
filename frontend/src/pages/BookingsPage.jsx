import React, { useEffect, useState } from "react";
import { axiosInstance } from "../App";
import AccountNav from "../components/AccountNav";
import PlaceImage from "../components/PlaceImage";
import { Link } from "react-router-dom";
import BookingDates from "../components/BookingDates";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axiosInstance.get("/bookings").then(({ data }) => setBookings(data));
  }, []);

  if (!bookings?.length) {
    return <AccountNav />;
  }
  return (
    <div>
      <AccountNav />
      {bookings.length > 0 &&
        bookings.map((booking) => {
          return (
            <Link to={`/account/bookings/${booking._id}`}
              key={booking?._id}
              className="grid grid-cols-[0.5fr_2.5fr] gap-2 bg-gray-200 mb-4 mt-8 rounded-xl overflow-hidden"
            >
              <PlaceImage place={booking?.place} />
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl">{booking.place.title}</h2>

                <BookingDates booking={booking} classNames={' border-t mt-2 text-gray-500'}/>
                <div>
                  <div className="flex gap-1 items-center text-xl">
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
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                      />
                    </svg>
                    Total price: Ghs{booking.price}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default BookingsPage;
