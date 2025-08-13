import database from "../../db/connection.js";

export async function findAll() {
    try {
        const query = "SELECT * FROM tasks;";
        const statement = database.prepare(query);
        const tasks = statement.all();
        return tasks;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching tasks: " + error.message);
    }
}

export async function findByUserId(user_id) {
    try {
        const query = "SELECT * FROM tasks WHERE user_id = ?;";
        const statement = database.prepare(query);
        const tasks = statement.all(user_id);
        return tasks;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching user tasks: " + error.message);
    }
}

export async function create(taskData) {
    try {
        const query = `
            INSERT INTO tasks 
            (user_id, title, description, status, due_date) 
            VALUES (?, ?, ?, ?, ?);
        `;
        const statement = database.prepare(query);
        const result = statement.run(
            taskData.user_id,
            taskData.title,
            taskData.description,
            taskData.status || 'pending', // Default to 'pending' if not provided
            taskData.due_date
        );
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error creating task: " + error.message);
    }
}

export async function remove(id) {
    try {
        const query = "DELETE FROM tasks WHERE id = ?;";
        const statement = database.prepare(query);
        const result = statement.run(id);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error deleting task: " + error.message);
    }
}

export async function update(id, taskData) {
    try {
        const query = `
            UPDATE tasks 
            SET 
                title = ?,
                description = ?,
                status = ?,
                due_date = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?;
        `;
        const statement = database.prepare(query);
        const result = statement.run(
            taskData.title,
            taskData.description,
            taskData.status,
            taskData.due_date,
            id
        );
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error updating task: " + error.message);
    }
}