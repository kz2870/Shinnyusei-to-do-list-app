"use client";
import React, { useState, useEffect } from 'react';
import { FilterOptions, SortOptions } from '@/types/filterSortOptions';
import FilterSortPanel from './FilterSortPanel';
import APIManager from '@/utils/APIManager';
import { Task } from '@/types/task';
import TodoListItem from './todoListItem';

const TodoList = React.memo(function TodoList() {
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [isFilterSortOpen, setIsFilterSortOpen] = useState(false);

    const [filters, setFilters] = useState<FilterOptions>({
        is_complete: "any",
        is_deleted: "false",
        labels: [],
    });
    const [sort, setSort] = useState<SortOptions>({
        orderBy: "due_date",
    });

    const fetchTasks = async () => {
        setIsLoading(true);
        console.log("fetching tasks");
        try {
            const tasks = await APIManager.getInstance().getTasks(filters, sort);
            setAllTasks(tasks);
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => { fetchTasks(); }, [filters, sort]);

    const handleApplyFiltersSort = (newFilters: any, newSort: any) => {
        console.log("Applying filters and sort:", newFilters, newSort);
        setFilters(newFilters);
        setSort(newSort);
        setIsFilterSortOpen(false);
    };

    return (
        <div className="flex-1 shrink-0 flex flex-col w-[26rem] h-full bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold grow">ALL YOUR TODO:</h2>
                <button
                    className="px-4 py-2 cursor-pointer"
                    onClick={() => fetchTasks()}
                >
                    <i className="align-text-top w-[1.5rem] h-[1.5rem] i-mdi-refresh"></i>
                </button>
                <button
                    className="px-4 py-2 cursor-pointer"
                    onClick={() => setIsFilterSortOpen(!isFilterSortOpen)}
                >
                    <i className="align-text-top w-[1.5rem] h-[1.5rem] i-mdi-sort-variant"></i>
                </button>
            </div>
            {isFilterSortOpen ? (
                <FilterSortPanel 
                    onApply={handleApplyFiltersSort} 
                    initialFilters={filters} 
                    initialSort={sort} 
                />
            ) : (
                isLoading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : (
                    <div className="space-y-2 overflow-y-auto">
                        {allTasks.map((task) => (
                            <TodoListItem key={task.taskid} {...task} />
                        ))}
                    </div>
                )
            )}
        </div>
    );
});

export default TodoList;
