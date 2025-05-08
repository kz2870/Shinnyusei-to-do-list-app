"use client";
import { useState, useEffect } from "react";
import TodoDetail from "@/components/todoDetail";
import TodoEdit from "@/components/TodoEdit";
import APIManager from "@/utils/APIManager";
import { Task } from "@/types/task";

export default function showTodo({ params }: { params: { taskid: string } }) {
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    async function fetchTask() {
        setLoading(true);
        const { taskid } = await params;
        const fetchedTask = await APIManager.getInstance().getTaskById(taskid);
        setTask(fetchedTask);
        setLoading(false);
    }

    function switchEdit() {
        setIsEditing(!isEditing);
    }

    useEffect(() => { fetchTask(); }, [params]);

    if (loading) {
        return <div>Task Loading...</div>;
    }

    return (
        <div>
            {isEditing ? (
                task && <TodoEdit task={task} switchEdit={switchEdit} />
            ) : (
                task && <TodoDetail task={task} switchEdit={switchEdit} />
            )}
        </div>
    );
}