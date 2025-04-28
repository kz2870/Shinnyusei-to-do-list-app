"use client";
import { useState, useEffect } from "react";
import TodoDetail from "@/components/todoDetail";
import APIManager from "@/utils/APIManager";
import { Task } from "@/types/task";

export default function showTodo({ params }: { params: { taskid: string } }) {
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);

    async function fetchTask() {
        setLoading(true);
        const { taskid } = await params;
        const fetchedTask = await APIManager.getInstance().getTaskById(taskid);
        setTask(fetchedTask);
        setLoading(false);
    }
    useEffect(() => { fetchTask(); }, [params]);

    if (loading) {
        return <div>Task Loading...</div>;
    }

    return (
        <div>
            {task && <TodoDetail task={task} onReload={fetchTask} />}
        </div>
    );
}