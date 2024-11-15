import express from "express";
import isAutheticated from "../middlewares/isAutheticated.js";
import { getMessage, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();
router.route('/send/:id').post(isAutheticated, sendMessage);
router.route('/all/:id').get(isAutheticated, getMessage);

export default router;

