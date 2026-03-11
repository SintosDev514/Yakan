import type { Request, Response, NextFunction } from "express";
import { requireAuth, getAuth } from "@clerk/express";
import { User } from "../models/User";

export type AuthRequest = Request & {
  userId?: string;
};

export const protectedRoute = [
  requireAuth(),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { userId: clerkId } = getAuth(req);

      if (!clerkId) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized / invalid Token" });
      }

      const user = await User.findOne({ clerkId });

      if (!user)
        return res
          .status(404)
          .json({ success: false, message: "User not found" });

      req.userId = user._id.toString();

      next();
    } catch (error) {
      console.error("Error in Protected Route", error);
      res.status(500).json({ success: false });
    }
  },
];
