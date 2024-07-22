import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getNextResponse } from "@/app/helper/responseMessage";
import { connectDb } from "@/app/helper/db";
import { User } from "@/app/models/user";
import jwt from  'jsonwebtoken';

connectDb()
export async function POST(request){
    const {email,password} =await request.json();

    try{
       const user= await User.findOne({email});
       const auth=bcrypt.compareSync(password, user.password);
       if(!auth){
        return NextResponse.json({ error: 'Invalid password' }, { status: 500 })
       }
       else{
 
        const token = jwt.sign(
            {
                _id:user._id,
                name:user.name
            },
            process.env.JWT_KEYS
        )



        const response= NextResponse.json({
            message:"Login successful",
            success:true,
       })

       response.cookies.set("login_token", token,{expiresIN:"1d",httpOnly:true})

       return response;
       }
    }
    catch(err){
        console.log(err);
        return getNextResponse("failed to get user",500,false);
    }
}