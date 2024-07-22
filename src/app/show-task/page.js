"use client"
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import jwt from "jsonwebtoken"
import { toast } from 'react-toastify';
import axios from "axios";
import { RiDeleteBin6Fill } from "react-icons/ri";


function page() {
 const searchparam= useSearchParams();
 const [gettasks, setTasks] = useState([]);
  const token =searchparam.get("token");
  console.log(searchparam.get("token"));
  useEffect(()=>{
    if(token==null||token==undefined) {
        toast.error("error in getting token from search param");
        return;
    }

   const userdata= jwt.decode(token,123456);
   console.log(userdata._id);

   axios.get(`http://localhost:3000/api/users/${userdata._id}/tasks`).then((response)=>{
     console.log(response.data);
     setTasks(response.data);

   }).catch(()=>{

   })



  },[token])


  var deletetask=(id)=>{
    console.log(id);

    axios.delete(`http://localhost:3000/api/tasks/${id}`).then((response)=>{
      console.log(response.data);
      window.location.reload(false);
      toast.success("task deleted successfully!");
    }).catch((error)=>{
      console.log(error.response);
      toast.error("error in deleting task");
    });
       }

  return (
    < >
    <div className='h-[100vh] '>
      <h1 className=" text-center m-2">Show tasks({gettasks.length})</h1>
    
    {
      gettasks.map((task)=>
        (
        <div className='grid grid-cols-12 '>
       
      <div className={`col-start-4 col-span-6 ${task.status=="Completed" ? "bg-green-400":" bg-slate-600"} shadow-xl rounded rounded-xl  p-2  m-2`}>
       
       <div className='flex justify-between'>
        <div>
          <h1 className=''>{task.title}</h1>
          <p className='font-normal'>{task.content}</p>
         <p className='text-left mt-1 font-bold'> Status :{task.status}</p>
         </div>
         <div>
          <RiDeleteBin6Fill onClick={()=>{deletetask(task._id)}} className='m-5 text-4xl'></RiDeleteBin6Fill>

         </div>

       </div>
          </div>
       </div>
        )
      )
    }
    </div>
   
  
    </>
  )
}

export default page
