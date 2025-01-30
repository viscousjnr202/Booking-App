// import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../App";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)
    const [showPhotos, setShowPhotos] = useState(false);
    useEffect(() =>{
     if(!user){
         axiosInstance.get('/profile').then(res => setUser(res.data))
         setReady(true)
     }
   }, [])
  return <UserContext.Provider value={{user, setUser, showPhotos, setShowPhotos}}>{children}</UserContext.Provider>;
}
