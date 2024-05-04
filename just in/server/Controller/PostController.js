  import PostModel from "../Model/PostModel.js";
  import mongoose from "mongoose";
  import UserModel from "../Model/userModel.js";

  //create a new Post

 export const createPost= async(req,res)=>{
    const newPost=new PostModel(req.body)

    try {
        await newPost.save()
        res.status(200).json (newPost)
    } catch (error) {
        res.status(500).json(error)
    }
 }

 // Get a Post
 export const getPost= async(req,res)=>{
    const id=req.params.id

    try {
       const post= await PostModel.findById(id)
        res.status(200).json (post)
    } catch (error) {
        res.status(500).json(error)
    }
 }
 // Update a Post
 export const updatePost= async(req,res)=>{
    const postId=req.params.id
    const {userId}=req.body

    try {
       const post= await PostModel.findById(postId)
       if(post.userId===userId){
        await post.updateOne({$set:req.body})
        res.status(200).json ("Poat Updated")
       }else{
        res.status(403).json ("Action forbiden")
       }
        
    } catch (error) {
        res.status(500).json(error)
    }
 }

 // Delete a Post
 export const deletePost= async(req,res)=>{
    const id=req.params.id
    const {userId}=req.body

    try {
       const post= await PostModel.findById(id)
       if(post.userId===userId){
        await post.deleteOne();
        res.status(200).json ("Poat Deleted Sucssfully")
       }else{
        res.status(403).json ("Action forbiden")
       }
        
    } catch (error) {
        res.status(500).json(error)
    }
 }
// Like / DisLike  a Post
export const likePost= async(req,res)=>{
    const id=req.params.id
    const {userId}=req.body

    try {
       const post= await PostModel.findById(id)
       if(!post.likes.includes(userId))
       {
        await post.updateOne({$push:{likes:userId}})
        res.status(200).json ("Post Liked")
       }
       else{
        await post.updateOne({$pull:{likes:userId}})
        res.status(200).json ("Post Unliked")
       }
        
    } catch (error) {
        res.status(500).json(error)
    }
 }
// Timeline a Post
export const timeLinePost= async(req,res)=>{
    const userId=req.params.id

    try {
       const currentUserPost= await PostModel.find({userId:userId})
       const followingPost = await UserModel.aggregate([
        {
            $match:{
                _id :new mongoose.Types.ObjectId(userId)
            }   
        },
        {
            $lookup:{
                from:"Post",
                localField:"following",
                foreignField:"userId",
                as:"followingPost"
            }   
        },
        {
            $project:{
                followingPost:1,
                _id:0
            }
        }
       ])
        res.status(200).json (currentUserPost.concat(...followingPost[0].followingPost)
        .sort((a,b)=>{
            return b.createdAt - a.createdAt;
        })
        )
    } catch (error) {
        res.status(500).json(error)
    }
 }