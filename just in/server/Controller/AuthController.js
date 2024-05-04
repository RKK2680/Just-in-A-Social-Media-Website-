import UserModel from "../Model/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

//Registring a new User

export const Registration = async (req,res)=>{
   
       const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.Password,salt);
      req.body.Password=hashedPass
    const newUser=new UserModel(req.body);
    const {username}=req.body
    try {

        const oldUser=await UserModel.findOne({username})
        if(oldUser)
            return res.status(400).json ({message:"User is Allredy Registered!"})
        
    const user= await newUser.save();
    const token=jwt.sign({
        username: user.username, id: user._id
    },process.env.JWT_Key,{expiresIn:'30m'})
        res.status(200).json({user,token})
    } catch (error) { 
        res.status(500).json({message: error.message})
    }
}; 
//user log in

export const userLogin = async (req,res)=>{
    const {username,Password}=req.body
    try {
        const user =await UserModel.findOne({username:username})
        if (user) {
            const validity =await bcrypt.compare(Password, user.Password)
            if (!validity) {
                res.status(400).json ("Worng Password")
            } else {
                const token=jwt.sign({
                    username:user.username,id: user._id
                },process.env.JWT_Key,{expiresIn:'30m'})
                    res.status(200).json({user,token})
            } 
        }
        else{
            res.status(400).json ("User Dos't Not Exit")
        }
    } catch (error) {
        res.status(500).json(error)
    }
};
