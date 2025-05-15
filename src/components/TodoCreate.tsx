import React from "react";
import TodoEditor , { EditableTask } from "./TodoEditor";
import { Task, validateTask } from "@/types/task";
import { useRouter } from "next/navigation";
import APIManager from "@/utils/APIManager";

import { useState } from "react";

export default function TodoCreate() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const emptyTask: EditableTask = {
        title: "",
        description: "",
        due_date: null,
        labels: [],
        priority: 0,
    };

    const router = useRouter();

    const handleSave = async (task: Partial<Task>) => {
        const modifiedTask = {
                ...task,
                taskid: String(Date.now()), // 一意のIDを生成
                created_at: new Date(),
                updated_at: new Date(),
                is_complete: false,
                is_deleted: false,
            } as Task;
        if (!validateTask(modifiedTask)) {
            setErrorMessage("Validation failed: Please check the task details.");
            return;
        }
        setErrorMessage(null);
        const apiManager = APIManager.getInstance();
        try {
            await apiManager.addTask(modifiedTask);
            console.log("Task created successfully:" + JSON.stringify(modifiedTask));
            router.push(`/task/${modifiedTask.taskid}`)
        } catch (error) {
            console.error("Error creating task:", error);
        } 
    };

    return (
        <>
            <TodoEditor task={emptyTask} onSave={handleSave} />
            {errorMessage && <div className="text-red-500 mb-2">{errorMessage}</div>}
        </>
    );
}