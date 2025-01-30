import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../App";
import PhotosUploader from "../components/PhotosUploader";
import Perks from "../components/Perks";
import AccountNav from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

const PlacesFormPage = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const refButton = useRef(null);
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    axiosInstance.get(`/places/${id}`).then(({ data }) => {
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setPhotoLink(data.photoLink);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function perInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function uploadFiles(e) {
    e.preventDefault();
    const files = [...e.target.files];
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("photos", file);
    });
    const { data } = await axiosInstance.post("/upload-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setAddedPhotos((prev) => [...prev, ...data]);
  }

  async function savePlace(e) {
    e.preventDefault();
    const submitData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      const { data } = await axiosInstance.put(`/places/${id}`, submitData);
      if (data) {
        setRedirect(true);
      }
    } else {
      const { data } = await axiosInstance.post("/places", {
        ...submitData,
      });

      if (data) {
        setRedirect(true);
      }
    }
  }
  function deleteImage(link) {
    setAddedPhotos((prev) => [...prev.filter((photo) => photo !== link)]);
  }

  function handleStar(ev, link) {
    ev.preventDefault();
    const filteredPhotos = addedPhotos.filter((photo) => photo !== link);

    setAddedPhotos([link, ...filteredPhotos]);
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }
  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {perInput(
          "Title",
          "Title for your place, should be short and catchy in advertisement"
        )}
        <input
          type="text"
          placeholder="title, for example: My lovely apt"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {perInput("Address", "Address to this place")}
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {perInput("Photos", "more = better")}
        <PhotosUploader
          photoLink={photoLink}
          setPhotoLink={setPhotoLink}
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />

        <div className="mt-2 grid grid-cols-2 gap-1 md:grid-col-4 lg:grid-cols-6">
          {addedPhotos.length > 0 &&
            addedPhotos.map((link, index) => {
              return (
                <div key={index} className="relative">
                  <div className="w-full h-full">
                    <button
                      className="absolute bottom-2 left-2 bg-black/50 p-1 rounded-lg"
                      onClick={(ev) => handleStar(ev, link)}
                    >
                      {addedPhotos[0] === link && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 bg-white-500 text-red-700"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                          />
                        </svg>
                      )}
                      {addedPhotos[0] !== link && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 bg-white-500 text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                          />
                        </svg>
                      )}
                    </button>
                    <p
                      onClick={() => deleteImage(link)}
                      className="pt-2 font-bold cursor-pointer absolute bottom-2 right-2 bg-black/50 text-white p-1 rounded-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                        <path
                          fillRule="evenodd"
                          d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.133 2.845a.75.75 0 0 1 1.06 0l1.72 1.72 1.72-1.72a.75.75 0 1 1 1.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 1 1-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </p>
                    <img
                      className="rounded-2xl object-fit w-full h-full"
                      src={`http://localhost:4000/uploads/${link}`}
                      alt=""
                    />
                  </div>
                </div>
              );
            })}
          <label className="border bg-transparent rounded-2xl py-8 px-2 text-2xl text-gray-600 inline-flex justify-center items-center">
            <input
              type="file"
              multiple
              className="hidden"
              accept="image/*"
              ref={refButton}
              onChange={uploadFiles}
            />
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
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            Upload
          </label>
        </div>
        {perInput("Description", "Description of the place")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {perInput("Perks")}

        <p className="text-gray-500 text-sm">
          Select all the perks of your place
        </p>
        <Perks selected={perks} onChange={setPerks} />
        {perInput("Extra info", "house rules, etc")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        {perInput(
          "Check in & out times",
          "house rules, etcadd check in and out times, remember to have some time window for cleaning the room between quests"
        )}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              placeholder="14:00"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button className="primary my-4">Save</button>
        </div>
      </form>
    </div>
  );
};

export default PlacesFormPage;
