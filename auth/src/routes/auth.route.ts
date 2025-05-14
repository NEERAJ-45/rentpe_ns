import express from 'express';
import {
    registerValidator,
    loginValidator,
    authMiddleware,
    refreshTokenValidator,
} from '../middlewares/auth.middleware';
import { 
    login,
    register,
    logout,
    newAccessToken
} from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);
router.get('/logout', authMiddleware, logout);
// router.get('/user', authMiddleware);
router.post('/refresh', refreshTokenValidator, newAccessToken);

export default router;
