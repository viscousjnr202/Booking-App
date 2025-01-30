import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { axiosInstance } from "../App";
import { Navigate } from "react-router-dom";
import { UserContext } from "../utilis/UserContext";
const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [redirect, setRedirect] = useState(false)
  const {user} = useContext(UserContext)

  let countDays = 0;
  if (checkIn && checkOut) {
    countDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  useEffect(() =>{
     setName(user?.name)
  }, [user])

async function handleBookings(){
    const datumItems = {checkIn, checkOut, numberOfGuests, name, mobile, place: place?._id, price: countDays * place?.price}
    const {data} = await axiosInstance.post('/bookings', datumItems)
    if(data){
        setCheckIn('')
        setCheckOut('')
        setNumberOfGuests(1)
        setName('')
        setMobile('')
        setRedirect(true)
    }
}
if(redirect){
    return <Navigate to={'/account/bookings'}/>
}
  return (
    <div className="bg-white p-4 rounded-2xl shadow mt-6">
      <div className="text-center text-xl ">
        Price: Ghs{place?.price}/per night
      </div>
      <div className="flex mt-4 border rounded-2xl">
        <div className="p-4">
          <label>Check in: </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <div className="p-4">
          <label>Check out: </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
      </div>
      <div className="py-3 px-4 border rounded-2xl">
        <label>Number of guests</label>
        <input
          type="number"
          value={numberOfGuests}
          onChange={(e) => setNumberOfGuests(e.target.value)}
        />
      </div>
      {countDays > 0 &&
      <div className="py-3 px-4 border rounded-2xl">
        <label>Your full name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Phone number</label>
        <input
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>
       }
      <div>
        <button className="primary mt-4" onClick={handleBookings}>Book this place</button>
        {countDays > 0 && (
          <span className="mt-2 text-lg font-semibold block text-center">
            GHS {countDays * place?.price}
          </span>
        )}
      </div>
    </div>
  );
};

export default BookingWidget;
