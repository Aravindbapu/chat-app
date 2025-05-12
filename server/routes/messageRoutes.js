import express from 'express';
import { protectRoute } from '../middleware/auth.js';
import { getUsersForSidebar, getMessages, markMessagesAsSeen, sendMessage } from '../controllers/messageController.js';

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsersForSidebar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.put("/mark/:id", protectRoute, markMessagesAsSeen);
messageRouter.post("/send", protectRoute, sendMessage);

export default messageRouter;