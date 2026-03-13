import { Router } from "express";
import { protectedRoute } from "../middleware/auth";
import { getMessage } from "../controller/messageController";

const router = Router();

router.get("/chat/:chatId", protectedRoute, getMessage);

export default router;
