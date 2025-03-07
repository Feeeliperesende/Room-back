import "reflect-metadata";
require("dotenv").config();
import express from "express";
import cors from "cors";
import {
  authRouter,
  userRouter,
  todoRouter,
  healthCheckRouter,
} from "./controllers";

const app = express();
const PORT = process.env.PORT || 80;

const initialPath = "/api/v1";

app.use(express.json());
app.use(cors());
app.use(initialPath, healthCheckRouter);
app.use(initialPath, authRouter);
app.use(initialPath, userRouter);
app.use(initialPath, todoRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} 🚀`);
});
