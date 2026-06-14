import { Router } from "express";
import {
  createTask,
  getTasks,
  getUserTasks,
  updatedTaskStatus,
} from "../controllers/taskController";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:taskId/status", updatedTaskStatus);
router.get("/user/:userId", getUserTasks);

export default router;
