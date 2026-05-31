import { Router } from "express"
import {
  createTask,
  getTasks,
  updatedTaskStatus,
} from "../controllers/taskController"

const router = Router()

router.get("/", getTasks)
router.post("/", createTask)
router.patch("/:taskId/status", updatedTaskStatus);

export default router
