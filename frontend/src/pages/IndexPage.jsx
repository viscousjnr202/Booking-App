import React, { useEffect, useState} from "react";
// import Header from "../components/Header";
import { axiosInstance } from "../App";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [allPlaces, setAllPlaces] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/all-places")
      .then(({ data }) =>
        setAllPlaces([...data])
      );
  }, []);
  return <div className=" mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
    {allPlaces.length > 0 && allPlaces.map(place =>{
      let truncate = ''
      if(place.address.length || place.title.length > 5){
        truncate += 'line-clamp-2'
      }
      return (
        <Link to={`/place/${place._id}`}>
          <div className={"aspect-square rounded-xl overflow-hidden"}>
          <img src={`https://booking-app-backend-259f.onrender.com/${place.photos[0]}`}/>
          </div>
          <h2 className={`mt-4 font-bold ${truncate}`}>{place.address}</h2>
          <h2>{place.title}</h2>
          <div className="mt-2"><span className="font-bold">${place.price}</span> per night</div>
        </Link>
      )
    })}
  </div>;
};

export default IndexPage;
