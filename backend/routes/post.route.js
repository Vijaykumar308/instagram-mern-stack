import express from "express";
import isAutheticated from "../middlewares/isAutheticated.js";
import upload from '../middlewares/multer.js'
import { addComment, addNewPost, bookmarkPost, deletePost, dislikePost, getAllPost, getCommentOfPost, getUserPost, likePost } from "../controllers/post.controller.js";

const router = express.Router();
router.route('/addpost').post(isAutheticated,upload.single('image'), addNewPost);
router.route('/all').post(isAutheticated, getAllPost);
router.route('/userpost/all').get(isAutheticated, getUserPost);
router.route('/:id/like').get(isAutheticated, likePost);
router.route('/:id/dislike').post(isAutheticated, dislikePost);
router.route('/:id/comment').post(isAutheticated, addComment);
router.route('/:id/comment/all').post(isAutheticated, getCommentOfPost);
router.route('/delete/:id').post(isAutheticated, deletePost);
router.route('/:id/bookmark').post(isAutheticated, bookmarkPost);

export default router;

