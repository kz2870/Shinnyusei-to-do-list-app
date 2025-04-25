"use client";
import React, { useState, useEffect } from 'react';
import APIManager from '@/utils/APIManager';
import { Task } from '@/types/task';
import TodoListItem from './todoListItem';

const TodoList = React.memo(function TodoList() {
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTasks = async () => {
            setIsLoading(true);
            try {
                const tasks = await APIManager.getInstance().getTasks();
                setAllTasks(tasks);
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div className="flex-1 shrink-0 w-[26rem] h-full bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">ALL YOUR TODO:</h2>
            {isLoading ? (
                <p className="text-gray-500">Loading...</p>
            ) : (
                <ul className="space-y-2">
                    {allTasks.map((task) => (
                        <TodoListItem key={task.taskid} {...task} />
                    ))}
                </ul>
            )}
        </div>
    );
});

export default React.memo(TodoList);
  