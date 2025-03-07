import express, { Request, Response } from "express";
import { AuthService } from "../../routes/useCases/auth";

const router = express.Router();
const service = new AuthService();
const prefix = "/auth";

router.post(prefix + "/login", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const auth = await service.login(data);

    if (!auth) {
      return res.status(400).json({ message: "Email ou Senha incorretas" });
    }

    return res.status(201).json(auth);
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
