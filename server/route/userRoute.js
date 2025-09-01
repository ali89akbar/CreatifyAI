import express from 'express';
import { auth } from '../middleware/auth.js';
import { getMailinfo, getPublishedCreations, getUserCreations, toggleLikeCreation } from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.get('/get-user-creations',auth,getUserCreations);
userRouter.get('/get-published-creations',auth,getPublishedCreations);
userRouter.post('/toggle-like-creation',auth,toggleLikeCreation);
userRouter.post('/send-mail',auth,getMailinfo)
export default userRouter;