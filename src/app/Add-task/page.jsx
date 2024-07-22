"use client";
import React, { useRef } from 'react';
import tskimg from '/public/addtask.png';
import Image from 'next/image';
import axios from 'axios';
import { toast } from "react-toastify";


function Page() {
  const titleRef = useRef("");
  const contentRef = useRef("");
  const statusRef = useRef("none");
  

  const handleAddTask = (event) => {
    event.preventDefault();
    const task = {
      title: titleRef.current.value,
      content: contentRef.current.value,
      status: statusRef.current.value,
      
    };
    console.log(task);
    // Add task logic here
    axios.post('http://localhost:3000/api/tasks',{
      title:task.title,
      content:task.content,
      status:task.status
    
    
      
    }).then((response)=>{
      console.log(response.data);
      toast.success("Task added successfully");

      
    }).catch((error) => {
      console.log(error);
      toast.error("task not added successfully");
    });

  };

  const handleClear = () => {
    titleRef.current.value = "";
    contentRef.current.value = "";
    statusRef.current.value = "none";
  };

  return (
    <div className='grid grid-cols-12 border h-[100vh] justify-center bg-slate-500'>
      <div className='col-span-6 col-start-4'>
        <h1 className='text-center mt-4 text-2xl'>Add Your Task Here</h1>
        <Image src={tskimg} className='max-h-[200px] sm:max-w-[500px] m-auto' alt='Add Task' />
        <form onSubmit={handleAddTask}>
          <label>Title</label><br />
          <input
            type='text'
            className='rounded-3xl w-full bg-gray-800 focus:ring-gray-400 border mb-2 p-2'
            ref={titleRef}
          />
          <label>Content</label><br />
          <textarea
            type='text'
            className='rounded-3xl w-full bg-gray-800 focus:ring-gray-400 border p-2'
            rows={5}
            ref={contentRef}
          ></textarea>
          <label>Status</label><br />
          <select
            className='rounded-3xl w-full bg-gray-800 focus:ring-gray-400 border p-2'
            ref={statusRef}
            defaultValue="none"
          >
            <option value="none" disabled>----Select----</option>
            <option value="Completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <div className='flex space-x-7 justify-center mt-5 rounded-md'>
            <button type='submit' className='bg-green-500 rounded-md p-2'>ADD TASK</button>
            <button type='button' className='bg-red-500 rounded-md p-2 w-20' onClick={handleClear}>Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
