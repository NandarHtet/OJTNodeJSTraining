import express from 'express';
import { login, loginUser, logout, protectedPage, signup,signupUser } from '../controllers/authController.js';
import checkSignIn from '../checkErrs/checkErr.js';

const router = express.Router();

router.route('/signup')
    .get(signup)
    .post(signupUser)

router.get('/protected_page',checkSignIn,protectedPage);

router.get('/logout',logout);

router.route('/login')
    .get(login)
    .post(loginUser)

export default router;