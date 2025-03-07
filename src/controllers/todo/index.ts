import express, { Request, Response } from "express";
import { TodoService } from "../../routes/useCases/todo";
import { authMiddleware } from "../../middleware/";

const router = express.Router();
const service = new TodoService();
const prefix = "/todo";

router.post(prefix + "/create", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const todo = await service.create(data);

    if (!todo) {
      return res.status(400).json({ message: "todo not created" });
    }

    return res.status(201).json(todo);
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
      const todo = await service.findById(id);
      return res.status(200).json(todo);
    } catch (error) {
      console.error("Error finding todo by id:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);
router.get(
  prefix + "/user/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const todo = await service.findByUserId(id);
      return res.status(200).json(todo);
    } catch (error) {
      console.error("Error finding todo by id:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.patch(
  prefix + "/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const todo = await service.update(id, data);
      return res.status(200).json(todo);
    } catch (error) {
      console.error("Error updating todo:", error);
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
      const todo = await service.remove(id);
      return res.status(200).json(todo);
    } catch (error) {
      console.error("Error removing todo:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
