import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv';
import AuthRoutes from './Routes/AuthRoutes.js'
import UserRoutes from './Routes/UserRoutes.js'
import PostRoute from './Routes/PostRoute.js'
import UploadRaote from './Routes/UploadRaote.js'
import ChatRoute from './Routes/ChatRoute.js'
import MessageRoter from './Routes/MessageRoter.js'
//Router

const app=express();
//to serve images for public
app.use(express.static('Public'))
app.use('/images',express.static("images"))

//medil
app.use(bodyParser.json({limit:'30mb',extended:'true'}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:'true'}))
app.use(cors())
dotenv.config()
mongoose
.connect(
    process.env.mongo_db,
    {
        useNewUrlParser:true,
        useUnifiedTopology: true
    })
    .then(()=>
    app.listen(process.env.PORT,() =>
    console.log(`Listening at ${process.env.PORT}`)))
.catch((error)=>console.log(error));

//uses of Routes

app.use('/auth',AuthRoutes)
app.use('/user',UserRoutes)
app.use('/post',PostRoute)
app.use('/upload',UploadRaote)
app.use('/chat',ChatRoute)
app.use('/message',MessageRoter)