import express, { Request, Response } from "express";
const router = express.Router();

router.get("/status", (req: Request, res: Response) => {
  res.send({ status: 200, isRunning: true });
});

export default router;
