import express, { Request, Response } from "express";
import { UserService } from "../../routes/useCases/user";
import { authMiddleware } from "../../middleware/";

const router = express.Router();
const service = new UserService();
const prefix = "/user";

router.post(prefix + "/create", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = await service.create(data);

    if (!user) {
      return res.status(400).json({ message: "User not created" });
    }

    return res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get(
  prefix + "/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const user = await service.findById(id);
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error finding user by id:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);
router.get(prefix + "/email/:email", async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const user = await service.findByEmail(email);
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error finding user by email:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.patch(
  prefix + "/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const user = await service.update(id, data);
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.delete(
  prefix + "/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const user = await service.remove(id);
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error removing user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
