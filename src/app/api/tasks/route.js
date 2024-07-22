import { connectDb } from "@/app/helper/db";
import { getNextResponse } from "@/app/helper/responseMessage";
import { Task } from "@/app/models/task";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

connectDb();
export async function GET()
{
    try{
        const task= await Task.find();
        return NextResponse.json(task);

    }catch(error){
        return getNextResponse("fail to get task",201,false);

    }    
}

export async function POST(request){

    const {title,content,status}=await request.json();

    const token = request.cookies.get("login_token").value
    console.log(token);

    const userdata= jwt.decode(token,123456);

    console.log(userdata);

    const task=new Task({
        title,
        content,
        status,
        userid:userdata._id,  
    });

    try{

    const createTask=await task.save();
    const response=NextResponse.json(createTask,{
        status:200,
    })

    return response;
    }catch(err){
        return getNextResponse("fail to create task",500,false);
    }
}