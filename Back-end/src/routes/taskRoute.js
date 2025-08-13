import express from 'express';
const router = express.Router();

import {getTasks, getUserTasks, createTask,deleteTask, updateTask} from '../controllers/taskController.js'

router.get("/task", getTasks);
router.get("/task", getUserTasks);
router.get("/task", createTask);
router.get("/task/:id", deleteTask);
router.get("/task/:id", updateTask);


export default router;