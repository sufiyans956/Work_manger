import { connectDb } from "@/app/helper/db";
import { getNextResponse } from "@/app/helper/responseMessage";
import { Task } from "@/app/models/task"
import { NextResponse } from "next/server";
connectDb();

export async function GET(request,{params}){
    const {taskid}=params;

    try{
        const task1= await Task.findById(taskid);
         return NextResponse.json(task1);
        
    }catch(error){
        return getNextResponse("fail to get single task",404,false);
        
    }    

}

export async function DELETE(request,{params}){
    const {taskid}=params;
    console.log(taskid);
    
    try{
    let user=await Task.findByIdAndDelete(taskid);
    return NextResponse.json({
        message: "User deleted",
        success: true,
    });
    
    }catch(err){
        console.log(err);
        return NextResponse.json({
          message:"fail to delete users",
          success:false,
        });
    
    
    }
    
    }
    
    export async function PUT(request,{params}){
        const {taskid}=params;
        const {title,content,status}=await request.json();
        try{
            const task= await Task.findById(taskid);
    
            task.title=title;
            task.content=content;
            task.status=status;
    
            const updatedTask= await task.save();
            return NextResponse.json(updatedTask);
        }catch (err) {
            console.log(err);
            return NextResponse.json(
                {
                    message:"failed to update task",
                    success: false,
                }
            )
        }
    }
    