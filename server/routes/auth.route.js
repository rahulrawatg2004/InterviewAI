import express from 'express';
const authRouter = express.Router();
import { googleAuth } from '../controllers/auth.controller.js';
import { logout } from '../controllers/auth.controller.js';

authRouter.post("/google", googleAuth);
authRouter.get("/logout", logout);

export default authRouter;