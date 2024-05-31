import { Router } from 'express';
import { validateToken } from '../../middlewares/validateToken.middleware.js';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from './tasks.controller.js';
import { taskSchema } from '../../schemas/task.schema.js';
import { validateData } from '../../middlewares/validateData.middleware.js';

const router = Router();

router.get('/tasks', validateToken, getTasks);
router.get('/tasks/:id', validateToken, getTask);
router.post('/tasks', validateToken, validateData(taskSchema), createTask);
router.put('/tasks/:id', validateToken, updateTask);
router.delete('/tasks/:id', validateToken, deleteTask);

export default router;
