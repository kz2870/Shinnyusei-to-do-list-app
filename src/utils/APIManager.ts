"use client"
import { Label } from '@/types/Label';
import { Task } from '@/types/Task';

export default class APIManager {
  private static instance: APIManager;
  private labels: Label[] = [
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
  private tasks: Task[] = [
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

  private constructor() {}

  public static getInstance(): APIManager {
    if (!APIManager.instance) {
      APIManager.instance = new APIManager();
    }
    return APIManager.instance;
  }

  // Label関連メソッド
  public async getLabels(): Promise<Label[]> {
    return Promise.resolve(this.labels);
  }

  public async addLabel(label: Label): Promise<void> {
    this.labels.push(label);
    return Promise.resolve();
  }

  public async updateLabel(labelId: string, updatedLabel: Partial<Label>): Promise<void> {
    const label = this.labels.find(l => l.label_id === labelId);
    if (label) {
      Object.assign(label, updatedLabel);
    }
    return Promise.resolve();
  }

  // Task関連メソッド
  public async getTasks(): Promise<Task[]> {
    return Promise.resolve(this.tasks);
  }

  public async addTask(task: Task): Promise<void> {
    this.tasks.push(task);
    return Promise.resolve();
  }

  public async updateTask(taskId: string, updatedTask: Partial<Task>): Promise<void> {
    const task = this.tasks.find(t => t.taskid === taskId);
    if (task) {
      Object.assign(task, updatedTask);
    }
    return Promise.resolve();
  }

  public async getTaskById(taskId: string): Promise<Task | undefined> {
    return Promise.resolve(this.tasks.find(task => task.taskid === taskId));
  }

  public async getLabelById(labelId: string): Promise<Label | undefined> {
    return Promise.resolve(this.labels.find(label => label.label_id === labelId));
  }
}