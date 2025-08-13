import { findAll, create, remove, update, findByUserId } from "../models/tastkModel.js";
import { z } from "zod";

const taskSchema = z.object({
    user_id: z.number().int().positive("User ID must be a positive integer"),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    status: z.string().default('pending'),
    due_date: z.string().optional() // You might want to add date validation here
});

export const getTasks = async (req, res) => {
    try {
        const tasks = await findAll();
        res.status(200).json({ tasks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
}

export const getUserTasks = async (req, res) => {
    try {
        const { user_id } = req.params;
        const tasks = await findByUserId(user_id);
        res.status(200).json({ tasks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
}

export const createTask = async (req, res) => {
    try {
        const taskData = taskSchema.parse(req.body);
        const result = await create(taskData);
        res.status(201).json({ message: "Task created successfully", taskId: result.lastInsertRowid });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await remove(id);
        if (result.changes === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
}

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const taskData = taskSchema.parse(req.body);
        const result = await update(id, taskData);
        if (result.changes === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
}