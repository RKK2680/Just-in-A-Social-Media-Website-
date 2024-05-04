import UserModel from "../Model/userModel.js";
import jwt from 'jsonwebtoken'
//import bcrypt from 'bcrypt'

// Get All User

export const getAllUser = async(req,res)=>{
    try {
        let users= await UserModel.find();
        users=users.map((user)=>{
            const {Password,...otherDetails}=user._doc
            return otherDetails;
        })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}
//Get a user

export const getUser = async(req,res)=>{
    const id = req.params.id;
    try {
        const user = await UserModel.findById(id);
        if (user) {
            
            const {Password, ...otherDetails}=user._doc
            res.status(200).json(otherDetails)
        }

        else{
            res.status(404).json ("Such User Not Exists")
        }
    } catch (error) {
        res.status(500).json(error)
    }
};

//Update a user

export const updateUser = async(req,res)=>{
    const id = req.params.id;
    const {_id, currentUserAdminStatus, Password}=req.body;
    if(id === _id){
        try {
            if(Password){
                const salt = await bcrypt.genSalt(10);
                req.body.Password = await bcrypt.hash(Password, salt);
            }
    
            const user = await UserModel.findByIdAndUpdate(id, req.body ,{
            new: true,});
            const token =jwt.sign(
                {username:user.username,id:user._id},
                process.env.JWT_Key,{expiresIn:"30m"}
            )
            res.status(200).json ({user,token})
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res
        .status(403)
        .json("Accses Denird ! You Can Only Update Profile");
    }
};
//Delete a user

export const deleteUser = async(req,res)=>{
    const id = req.params.id;
    const {currentUserId, currentUserAdminStatus}=req.body;
    if(currentUserId === id || currentUserAdminStatus){
        try {
             await UserModel.findByIdAndDelete(id)
            res.status(200).json ("User is sucssesfully Deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.status(403).json
        ("Accses Denird ! You Can Only Delete Profile");
    }
};
// Follow a user
export const followUser = async(req,res)=>{
    const id = req.params.id;
    const {_id}=req.body
    if (_id === id) {
        res.status(403).json("Action Follow")
    } else {
        try {
            const followUser= await UserModel.findById(id)
            const followingUser=await UserModel.findById(_id)
            if(!followUser.followers.includes(_id))
            {
                await followUser.updateOne({$push: {followers : _id}})
                await followingUser.updateOne({$push: {following : id}})
                res.status(200).json ("User Followed!")
            }
            else{
                res.status(403).json ("User Allredy Followed By You")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
// unFollow a user
export const unFollowUser = async(req,res)=>{
    const id = req.params.id;
    const {_id}=req.body
    if (_id === id) {
        res.status(403).json("Action Follow")
    } else {
        try {
            const followUser= await UserModel.findById(id)
            const followingUser=await UserModel.findById(_id)
            if(followUser.followers.includes(_id))
            {
                await followUser.updateOne({$pull: {followers : _id}})
                await followingUser.updateOne({$pull: {following : id}})
                res.status(200).json ("User UnFollowed!")
            }
            else{
                res.status(403).json ("User is Not Followed By You")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}