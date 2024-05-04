import express from 'express'
const router = express.Router()
import multer from 'multer'

const storege =multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "public/images");

    },
    filename: (req, file ,cb)=>{
        cb(null , req.body.name);
    },
});

const upload= multer({storage: storege});
router.post('/', upload.single("file" ,(req,res)=>{
    try {
        return res.status(200).json("File Uploaded Seccessfully")
    } catch (error) {
        console.log(error);
    }
}))

export default router