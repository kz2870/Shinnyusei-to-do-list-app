import React, { useState, useEffect } from "react";
import TodoEditor from "./TodoEditor";
import { Task } from "@/types/task";
import APIManager from "@/utils/APIManager";

interface TodoEditProps {
    task: Task;
    switchEdit: () => void;
}

export default function TodoUpdate({ task, switchEdit }: TodoEditProps) {

    const handleSave = async () => {
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
        <TodoEditor task={task} onSave={handleSave} />
    );
}