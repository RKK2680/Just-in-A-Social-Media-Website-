import mongoose from 'mongoose'

const UserSchema = mongoose.Schema(
    {
        username:{
            type: String,
            require: true
        }
        ,
        Password:{
            type: String,
            require: true
        }
        ,
        fistname:{
            type: String,
            require: true
        }
        ,
        lastname:{
            type: String,
            require: true
        }
        ,
        isAdmin:{
            type: Boolean,
            default: false
        },
        profilePic : String,
        coverPic : String,
        about : String,
        livesin: String,
        worksAt: String,
        country:String,
        relationship: String,
        followers:[],
        following:[]
    },
    {timestamps: true}
)
const UserModel =  mongoose.model('Users', UserSchema);
export default UserModel