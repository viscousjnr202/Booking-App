import React, { useContext, useState } from "react";
import { UserContext } from "../utilis/UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import { axiosInstance } from "../App";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";
const Account = () => {
  const [redirect, setRedirect] = useState(false);
  const { user, ready, setUser } = useContext(UserContext);
  let { subpage } = useParams();

  if (!ready) {
    <p>Loading...</p>;
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }
  if (subpage === undefined) {
    subpage = "profile";
  }

 
  async function logout() {
    await axiosInstance.post("/logout", {});
    setRedirect(true);
    setUser(null);
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <AccountNav/>
      {subpage === "profile" && (
        <div className="max-w-sm mx-auto my-8">
          <p className="text-center">Logged in as {user?.name}</p>
          <button
            className="block bg-primary w-full rounded-xl py-1 text-white mt-1"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
      {subpage === 'places' && <PlacesPage/>}
    </div>
  );
};

export default Account;
