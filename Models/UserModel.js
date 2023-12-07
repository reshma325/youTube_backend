import mongoose, { Schema } from "mongoose";

const user=new Schema({
    f_name:String,
    l_name:String,
    dob:String,
    gender:String,
    email:String,
    password:String

    
})
export default (mongoose.model("user",user));