import mongoose from "mongoose";
const poatSchema=mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    desc:String,
    likes:[],
    image:String,
},
 
{  
    timestamps: true
})
var PostModel=mongoose.model("Posts",poatSchema)
export default PostModel