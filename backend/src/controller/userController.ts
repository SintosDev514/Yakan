import { User } from "./../models/User";
import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
export async function getUsers(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;

    const users = await User.find({ _id: { $ne: userId } })
      .select("name image avatar")
      .limit(30);

    res.json(users);
  } catch (error) {
    res.status(500);
    next(error);
  }
}
