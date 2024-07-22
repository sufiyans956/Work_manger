"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import { toast } from "react-toastify";
import {useRouter } from 'next/navigation'
function Navbar({ value }) {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  
  
  useEffect(() => {
    const token = value;
    if (!token) return;
   

    
    console.log(token);

    try {
      const decodedToken = jwt.decode(token, "1234567");
      const userId = decodedToken._id;
      console.log(userId);
      
      if(userId==null){
        toast.error("user not found");
      }
      
      axios
        .get(`http://localhost:3000/api/users/${userId}`)
        .then((response) => {
          setUserData(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      } catch (e) {
        console.log(e);
      }
    
  }, [value]);
  
  
  const handleLogout = () => {
    setUserData(null);

    axios.post(`http://localhost:3000/api/connect`).then((response) => {
      console.log(response.data);
      toast.success("User logged out");
      router.push("/");
    }).catch((err) => {
      toast.error(err.message);
    });
  };

  const AuthenticatedNav = () => (
    <nav className="bg-blue-400 h-12 flex justify-between items-center">
      <div>
        <h2 className="font-bold text-2xl p-2">Work Manager</h2>
      </div>
      <div>
        <ul className="mr-2 flex space-x-5">
          <li className="hover:text-blue-950">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-blue-950">
            <Link href="/Add-task">Add Task</Link>
          </li>
          <li className="hover:text-blue-950">
          <Link href={{pathname:"/show-task",query:{token:value}}}>Show Task</Link>
          </li>
        </ul>
      </div>
      <div>
        <ul className="p-10 flex space-x-4">
           <li>
            <h4>Welcome {userData.name}</h4>
          </li>
          <li>
            <Link href="/login" onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );

  const UnauthenticatedNav = () => (
    <nav className="bg-blue-400 h-12 flex justify-between items-center">
      <div>
        <h2 className="font-bold text-2xl p-2">Work Manager</h2>
      </div>
      <div>
        <ul className="mr-2 flex space-x-5">
          <li className="hover:text-blue-950">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-blue-950">
            <Link href="/Add-task">Add Task</Link>
          </li>
          <li className="hover:text-blue-950">
            <Link href="/show-task">Show Task</Link>
          </li>
        </ul>
      </div>
      <div>
        <ul className="p-10 flex space-x-4">
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/signup">Signup</Link>
          </li>
        </ul>
      </div>
    </nav>
  );

  return (
    <>
      {userData ? <AuthenticatedNav /> : <UnauthenticatedNav />}
    </>
  );
}

export default Navbar;
