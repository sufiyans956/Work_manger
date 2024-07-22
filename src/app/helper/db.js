
import mongoose from "mongoose";
import { User } from "../models/user";

export const connectDb =async()=>{

    try{
        const{ connection} =await mongoose.connect(process.env.Mongo_DB_URL,{
            dbName:"Work_manager",
        })
        console.log("db connected",connection);

       

    }
    catch(error){
        console.log("fail to connect")
        console.log(error)

    }
}