import { connectDb } from "@/app/helper/db";
import { User } from "@/app/models/user";
import { NextResponse } from "next/server";

export async function GET(req,{params}){
    const {userid}=params;
    console.log(userid);

    let user=   await User.findById(userid);
    return NextResponse.json(user);
}



export async function DELETE(request,{params}){
const {userid}=params;
console.log(userid);

try{
let user=await User.deleteOne({
    _id: userid,
});
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
    const {userid}=params;
    console.log(userid);

    const {name,password,about,profileURL}= await request.json();

    try{
        const user= await User.findById(userid);

        user.name = name;
        user.password = password;
        user.about = about;
        user.profileURL = profileURL;

        const updatedUser= await user.save();
        return NextResponse.json(updatedUser);
    }catch(err){
        return NextResponse.json({
            message: "failed to update user",
            success: false,
        });

    }

}
