import React, { useState, useEffect } from "react";
import TodoEditor from "./TodoEditor";
import { Task, validateTask } from "@/types/task";
import APIManager from "@/utils/APIManager";

interface TodoEditProps {
    task: Task;
    switchEdit: () => void;
}

export default function TodoUpdate({ task, switchEdit }: TodoEditProps) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSave = async (task: Partial<Task>) => {
        if (!validateTask(task)) {
            setErrorMessage("Validation failed: Please check the task details.");
            return;
        }
        setErrorMessage(null);
        const apiManager = APIManager.getInstance();
        try {
            await apiManager.updateTask(task.taskid!, task);
            console.log("Task updated successfully:", task);
        } catch (error) {
            console.error("Error updating task:", error);
        } finally {
            switchEdit();
        }
    };

    return (
        <>
            <TodoEditor task={task} onSave={handleSave} />
            {errorMessage && <div className="text-red-500 mb-2">{errorMessage}</div>}
        </>
    );
}