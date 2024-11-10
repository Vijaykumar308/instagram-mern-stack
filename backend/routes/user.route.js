import express from "express";
import { editProfile, followOrUnfollow, getProfile, getSuggstedUser, login, logout, register } from "../controllers/user.controller.js";
import isAutheticated from "../middlewares/isAutheticated.js";
import upload from '../middlewares/multer.js'

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/:id/profile').get(isAutheticated, getProfile);
router.route('/profile/edit').post(isAutheticated,upload.single('profilePicture'), editProfile);
router.route('/suggested').get(isAutheticated, getSuggstedUser);
router.route('/followOrunfollow/:id').get(isAutheticated, followOrUnfollow);

export default router;