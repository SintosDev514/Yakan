import { Router } from "express";

const router = Router();

router.get("/test", (req, res) => {
  res.json({ status: "ok", message: "gana" });
});

export default router;
