import express from 'express';
import { Registration, userLogin } from '../Controller/AuthController.js';

const router =express.Router()

router.post('/register', Registration)
router.post('/login', userLogin)
export default router