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
        <div>
            <p>ALL YOUR TODO: </p>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                allTasks.map((task) => (
                    <TodoListItem key={task.taskid} {...task} />
                ))
            )}
        </div>
    );
});

export default React.memo(TodoList);
  