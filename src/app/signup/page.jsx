"use client"
import axios from 'axios';
import React, { useState } from 'react'
import { toast } from "react-toastify";
const page = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        about: "",
        profileURL:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz1K1evWjMTfR3IMBxQxXSGV2pTaO2rAP7EzIMB4u0YwxfFL4pJ269eff6sNvuxtjI7c4s",
      });

   const doSignup =(event)=>{
    event.preventDefault();
    if (data.name.trim() === "" || data.name == null) {
        toast.warning("Name is required !!", {
          position: "top-center",
        });
        return;
      }

    console.log(data);

    axios.post(`http://localhost:3000/api/users`,{

        name:data.name,
        email:data.email,
        password:data.password,
        about:data.about,

    }).then((response)=>{
        console.log(response.data);
        toast.success("User is registered !!", {
            position: "top-center",
          });
          setData({
            name: "",
            email: "",
            password: "",
            about: "",
            profileURL:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz1K1evWjMTfR3IMBxQxXSGV2pTaO2rAP7EzIMB4u0YwxfFL4pJ269eff6sNvuxtjI7c4s",
          });
        

    }).catch((error)=>{
        console.log(error);
        toast.error("Signup Error !! ", {
            position: "top-center",
          });
        
    });


   }   
  return (
    <div>
      <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          Flowbite    
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#" onSubmit={doSignup}>
                    <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Name</label>
                      <input type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required=""
                      onChange={(event) => {
                        setData({
                          ...data,
                          name: event.target.value,
                        });
                      }}
                      value={data.name}/>
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                      onChange={(event) => {
                        setData({
                          ...data,
                          email: event.target.value,
                        });
                      }}
                      value={data.email}/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                       onChange={(event) => {
                        setData({
                          ...data,
                          password: event.target.value,
                        });
                      }}
                      value={data.password}/>
                  </div>
                  <div>
                      <label for="about" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About</label>
                      <textarea     type="text" name="about"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required=""
                       onChange={(event) => {
                        setData({
                          ...data,
                          about: event.target.value,
                        });
                      }}
                      value={data.about}/>
                  </div>
                 
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  <button type="submit" class="w-full text-white bg-slate-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                      Already have an account? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default page
