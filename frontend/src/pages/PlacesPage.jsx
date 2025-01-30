import React, { useEffect, useRef, useState } from "react";
import { data, Link, Navigate } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { axiosInstance } from "../App";
import PlaceImage from "../components/PlaceImage";

const PlacesPage = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/places")
      .then(({data}) => setItems(data));
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="w-full pt-6 flex flex-col">
        <Link
          className="bg-primary mx-auto inline-flex px-2 py-1 rounded-2xl text-white"
          to={"/account/places/new"}
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
        {items.length > 0 &&
          items.map((item, index) => {
            return (
              <Link to={`/account/places/${item._id}`} key={index}>
                <div className="bg-gray-100 grid  grid-cols-[0.5fr_2.5fr] items-center gap-4 my-4 px-2 py-4 rounded-2xl">
                  
                  <PlaceImage place={item}/>
                  <div className="grow-0 shrink1">
                    <h3 className="text-xl mb-1 font-bold">{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default PlacesPage;
