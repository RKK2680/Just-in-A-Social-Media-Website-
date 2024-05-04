import express from 'express'
import { createPost, deletePost, getPost, likePost, timeLinePost, updatePost } from '../Controller/PostController.js';
const router = express.Router()
/*router.get('/',async(req,res)=>{
    res.send("Posr")
})*/

router.post('/',createPost)
router.get('/:id',getPost)
router.put('/:id',updatePost)
router.delete('/:id',deletePost)
router.put('/:id/like',likePost)
router.get('/:id/timeline',timeLinePost)
export default router;