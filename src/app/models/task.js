import mongoose, { Schema } from "mongoose";

const TaskSchema=new Schema({
    title:{type:"string",
        required:true,
    },
    content:{
        type:String,
       required:true,
    },
    addedDate:{
        type:Date,
    required:true,
    default:Date.now(), 
   },
   status:{
   type:String,
   enum:["pending","Completed"],
   default:"pending", 
},
userid:{
    type:mongoose.ObjectId,
    required:true,
}
   

});

export const Task=mongoose.models.tasks || mongoose.model("tasks",TaskSchema);