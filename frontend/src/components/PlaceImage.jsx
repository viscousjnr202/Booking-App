import React from "react";

const PlaceImage = ({place, index= 0}) => {
  return (
    <div className=" bg-slate-500 grow shrink-0 w-full h-full">
      <img src={`http://localhost:4000/uploads/${place?.photos[index]}`} alt="" />
    </div>
  );
};

export default PlaceImage;
