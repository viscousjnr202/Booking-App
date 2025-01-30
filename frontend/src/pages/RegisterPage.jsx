import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
// import axios from 'axios'
import { axiosInstance } from "../App";
const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  
  async function registerUser (e){
    e.preventDefault()
    try {
      await axiosInstance.post('/register', {name, email, password})  
      alert('User registered successfully')
      setRedirect(true)
    } catch (error) {
      alert('Failed to Registered')
    }
  }

  if(redirect){
    return <Navigate to={"/login"}/>
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-lg  m-auto" onSubmit={registerUser}>
          <input type="text" placeholder="Mark Kubi" value={name} onChange={(e) => setName(e.target.value)}/>
          <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already have an account?  <Link to={'/login'} className="underline text-black">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
