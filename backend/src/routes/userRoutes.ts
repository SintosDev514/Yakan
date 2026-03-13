import { Router } from "express";
import { protectedRoute } from "../middleware/auth";
import { getUsers } from "../controller/userController";

const router = Router();

router.get("/", protectedRoute, getUsers);

export default router;
