import React from "react";
import TodoEditor , { EditableTask } from "./TodoEditor";
import { Task } from "@/types/task";
import { useRouter } from "next/navigation";
import APIManager from "@/utils/APIManager";

export default function TodoCreate() {
    const emptyTask: EditableTask = {
        title: "",
        description: "",
        due_date: null,
        labels: [],
        priority: 0,
    };

    const router = useRouter();

    const handleSave = async (task: Partial<Task>) => {
        const apiManager = APIManager.getInstance();
        try {
            await apiManager.addTask({
                ...task,
                taskid: String(Date.now()), // 一意のIDを生成
                created_at: new Date(),
                updated_at: new Date(),
                is_complete: false,
                is_deleted: false,
            } as Task);
            console.log("Task created successfully:", task);
        } catch (error) {
            console.error("Error creating task:", error);
        } finally {
            router.push(`/task/${task.taskid}`);
        }
    };

    return <TodoEditor task={emptyTask} onSave={handleSave} />;
}