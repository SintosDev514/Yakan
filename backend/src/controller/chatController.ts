import { Chat } from "./../models/Chat";
import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";

export async function getChats(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;

    const chats = await Chat.find({ participants: userId })
      .populate("participants", "name email avatar")
      .populate("lastMessage")
      .sort({ lastMessageAt: -1 });

    const formattedChats = chats.map((chat) => {
      const otherParticipant = chat.participants.find(
        (p) => p._id.toString() !== userId,
      );

      return {
        _id: chat._id,
        participants: otherParticipant,
        lastMessage: chat.lastMessage,
        lastMessageAt: chat.lastMessageAt,
        createdAt: chat.createdAt,
      };
    });

    return res.json(formattedChats);
  } catch (error) {
    next(error);
  }
}

export async function getOrCreateChat(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;
    const { participants } = req.params;

    let chat = await Chat.findOne({
      participants: { $all: [userId, participants] },
    })
      .populate("participants", "name email avatar")
      .populate("lastMessage");

    if (!chat) {
      const newChat = new Chat({ participants: [userId, participants] });

      await newChat.save();

      chat = await newChat.populate("participants", "name email avatar");
    }

    const otherParticipant = chat.participants.find(
      (p) => p._id.toString() !== userId,
    );

    res.json({
      _id: chat._id,
      participant: otherParticipant ?? null,
      lastMessage: chat.lastMessage,
      lastMessageAt: chat.lastMessageAt,
      createdAt: chat.createdAt,
    });
  } catch (error) {
    res.status(500);
    next(error);
  }
}
