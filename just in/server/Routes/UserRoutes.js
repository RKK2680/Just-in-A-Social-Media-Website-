import express from 'express'
import { deleteUser, followUser, getUser, unFollowUser, updateUser ,getAllUser} from '../Controller/UserController.js';
import AuthMiddelWare from '../Middelware/AuthMiddelware.js';
//import { getAllUser } from '../../clint/src/Api/UserReq.js';

const router =express.Router();
router.get('/',getAllUser)
router.get('/:id',getUser)
router.put('/:id',AuthMiddelWare,updateUser)
router.delete('/:id',AuthMiddelWare,deleteUser)
router.put('/:id/follow',AuthMiddelWare,followUser)
router.put('/:id/unfollow',AuthMiddelWare,unFollowUser)
export default router;