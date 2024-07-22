import { connectDb } from "@/app/helper/db";
import { User } from "@/app/models/user";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

connectDb();

export async function GET()
{
    let users=[];
  
    try{
      users=await User.find();
  
    }catch(err){
      console.log(err);
      return NextResponse.json({
        message:"fail to get users",
        success:false,
      });
    }
    return NextResponse.json(users);    
}
export async function POST(request){

    const {name,email,password,about,profileURL}=await request.json();

    const user=new User({
        name,
        email,
        password,
        about,
        profileURL,
    });

    try{
    user.password= await bcryptjs.hashSync(password,parseInt(process.env.BCRYPT_SALT));
    const createUser=await user.save();
    const response=NextResponse.json(user,{
        status:201,
    })

    return response;
    }catch(err){
        return NextResponse.json({
            message:"failed to create user !!",
            status:false,
        })
    }
}