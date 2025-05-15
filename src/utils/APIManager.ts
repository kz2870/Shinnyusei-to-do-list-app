"use client"
import { Label } from '@/types/label';
import { Task } from '@/types/task';
import { FilterOptions, SortOptions } from '@/types/filterSortOptions';

export default class APIManager {
    private static instance: APIManager;
    private default_labels: Label[] = [
        {
            label_id: '1',
            label_name: 'label1',
            color_code: '#FF0000',
        },
        {
            label_id: '2',
            label_name: 'label2',
            color_code: '#00FF00',
        },
        {
            label_id: '3',
            label_name: 'label3',
            color_code: '#0000FF',
        },
        {
            label_id: '4',
            label_name: 'label4',
            color_code: '#808080',
        },
        {
            label_id: '5',
            label_name: 'label5',
            color_code: '#FFFF00',
        },
    ];
    private default_tasks: Task[] = [
        {
            taskid: '1',
            title: 'Sample Task 1',
            labels: ['1', '2'],
            description: 'This is a sample task description.',
            due_date: new Date('2023-10-01'),
            priority: 1,
            created_at: new Date(),
            updated_at: new Date(),
            is_complete: false,
            is_deleted: false,
        },
        {
            taskid: '2',
            title: 'Sample Task 2',
            labels: ['3'],
            description: 'This is another sample task description.',
            due_date: null,
            priority: 2,
            created_at: new Date(),
            updated_at: new Date(),
            is_complete: true,
            is_deleted: false,
        },
        {
            taskid: '3',
            title: 'Deleted Task 1',
            labels: ['4'],
            description: 'This task is marked as deleted.',
            due_date: new Date('2023-11-01'),
            priority: 3,
            created_at: new Date(),
            updated_at: new Date(),
            is_complete: false,
            is_deleted: true,
        },
        {
            taskid: '4',
            title: 'Deleted Task 2',
            labels: ['5', '3'],
            description: 'Another deleted task example.',
            due_date: null,
            priority: 4,
            created_at: new Date(),
            updated_at: new Date(),
            is_complete: true,
            is_deleted: true,
        },
    ];

    private constructor() {
        const labelsJson = localStorage.getItem('labels');
        if (!labelsJson) {
            localStorage.setItem('labels', JSON.stringify(this.default_labels));
        }

        const tasksJson = localStorage.getItem('tasks');
        if (!tasksJson) {
            localStorage.setItem('tasks', JSON.stringify(this.default_tasks));
        }
    }

    public static getInstance(): APIManager {
        if (!APIManager.instance) {
            APIManager.instance = new APIManager();
        }
        return APIManager.instance;
    }

    // Label関連メソッド
    public async getLabels(): Promise<Label[]> {
        const jsonData = localStorage.getItem('labels');
        const labels = jsonData ? JSON.parse(jsonData) : [];
        return labels;
    }

    public async addLabel(label: Label): Promise<void> {
        const labels = await this.getLabels();
        labels.push(label);
        localStorage.setItem('labels', JSON.stringify(labels));
        return Promise.resolve();
    }

    public async updateLabel(labelId: string, updatedLabel: Partial<Label>): Promise<void> {
        const labels = await this.getLabels();
        const index = labels.findIndex((label: Label) => label.label_id === labelId);
        if (index !== -1) {
            Object.assign(labels[index], updatedLabel);
            localStorage.setItem('labels', JSON.stringify(labels));
        }
    }

    // Task関連メソッド
    public async getTasks(filters?: FilterOptions, sort?: SortOptions): Promise<Task[]> {
        const jsonData = localStorage.getItem('tasks');
        const tasks = (jsonData ? JSON.parse(jsonData) : []).map((task: Task) => ({
            ...task,
            due_date: task.due_date ? new Date(task.due_date) : null,
            created_at: new Date(task.created_at),
            updated_at: new Date(task.updated_at),
        })) as Task[];
        let filteredTasks = tasks;

        // 絞り込み処理
        if (filters) {
            filteredTasks = this.filterTasks(filteredTasks, filters);
        }

        // 並び替え処理
        if (sort) {
            filteredTasks = this.sortTasks(filteredTasks, sort);
        }

        return filteredTasks;
    }

    private filterTasks(tasks: Task[], filters: FilterOptions): Task[] {
        return tasks.filter((task) => {
            const matchesComplete = filters.is_complete === "any" || task.is_complete === (filters.is_complete === "true");
            const matchesDeleted = filters.is_deleted === "any" || task.is_deleted === (filters.is_deleted === "true");
            const matchesLabels = filters.labels.length === 0 || filters.labels.every(label => task.labels.includes(label));
            return matchesComplete && matchesDeleted && matchesLabels;
        });
    }

    private sortTasks(tasks: Task[], sort: SortOptions): Task[] {
        return tasks.sort((a, b) => {
            if (sort.orderBy === "due_date") {
                return new Date(a.due_date || 0).getTime() - new Date(b.due_date || 0).getTime();
            }
            if (sort.orderBy === "priority") {
                return (a.priority || 0) - (b.priority || 0);
            }
            if (sort.orderBy === "created_at") {
                return new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime();
            }
            if (sort.orderBy === "title") {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });
    }

    public async addTask(task: Task): Promise<void> {
        const tasks = await this.getTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        return Promise.resolve();
    }

    public async updateTask(taskId: string, updatedTask: Partial<Task>): Promise<void> {
        const tasks = await this.getTasks();
        const index = tasks.findIndex((task) => task.taskid === taskId);
        if (index !== -1) {
            Object.assign(tasks[index], updatedTask);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    public async getTaskById(taskId: string): Promise<Task | undefined> {
        const tasks = await this.getTasks();
        return tasks.find((task: Task) => task.taskid === taskId);
    }

    public async getLabelById(labelId: string): Promise<Label | undefined> {
        const labels = await this.getLabels();
        return labels.find((label: Label) => label.label_id === labelId);
    }
}