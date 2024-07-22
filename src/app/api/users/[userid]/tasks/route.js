import { getNextResponse } from "@/app/helper/responseMessage";

const { Task } = require("@/app/models/task");
const { NextResponse } = require("next/server");

export async function GET(request,{params}){

    const{userid}=params;
    console.log(userid);
    

    try{
        const task=await Task.find({userid:userid});

        return NextResponse.json(task);
    }
    catch(err){

        return getNextResponse("error to user tasks",500,false);
    }
}