import { findAll, create, remove, update,  } from "../models/userModel.js";
import { z } from "zod"

const userSchema = z.object({
    name: z.string().min(1, "nome do usuario é obrigatório"),
    email: z.string().email("E-mail inválido"),
    password: z.string().optional(),
    
});

export const getUsers = async (req, res) =>{
    try {
        const users = await findAll()
        res.status(200).json({users});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
}

export const createUser = async (req, res) => {
    try {
        //const userData = req.body;
        const userData = userSchema.parse(req.body);


        const result = await create(userData);
        res.status(201).json({ message: "User created successfully", userId: result.lastInsertRowid });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const {id}  = req.params;
        const result = await remove(id);
        if (result.changes === 0){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
        
    }
}

export const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const userData = userSchema.parse(req.body);
        const result = await update(id, userData);
        if (result.changes === 0){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
}
export const updateUserRole = async (req, res) => {
    try {
        const {id} = req.params;
        const {role} = req.body;
        const result = await updateRole(id, role);
        if (result.changes === 0){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
}