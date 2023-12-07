import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from '../Models/UserModel.js';

export const login=async(req,res)=>{
 try {
    const {email,password}=req.body;
    if(!email ||!password)return res.status(401).json({success:false,message:"Please provide valid credentials for login"})
    const user=await UserModel.findOne({email:email})
if(!user)return res.status(401).json({success:false,message:"Register First to login"});
const isCorrectPassword=await bcrypt.compare(password,user.password);
if(!isCorrectPassword)return res.status(401).json({success:false,message:"Please provide valid password to login"});
const token=await jwt.sign({id:user._id},process.env.JWT_SECRET)
return res.status(200).json({success:true,message:"logged in successfully", user:{name:user.f_name,id:user._id},token}) 


    
 } catch (error) {
    return res.status(500).json({success:false,message:"Something went wrong,Try again after sometime."}) 
 }
}

export const register=async(req,res)=>{
 try {
    const {f_name,l_name,dob,gender,email,password}=req.body;
    if(!f_name || !l_name ||!dob ||!gender ||!email ||!password)return res.status(401).json({success:true,message:"Please fill all fields"})

    const hashedPassword=await bcrypt.hash(password,10);
    const user=new UserModel({f_name,l_name,dob,gender,email,password:hashedPassword})
    await user.save();
    return res.status(200).json({success:true,message:"Registered successfully"})
 } catch (error) {
    return res.status(500).json({success:false,message:"Something went wrong,Try again after sometime."})
 }
}