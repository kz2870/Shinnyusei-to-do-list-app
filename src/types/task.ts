export interface Task {
  taskid: string; // (UUID想定)
  title: string;
  labels: string[];
  description: string;
  due_date: Date | null;
  priority: number;
  created_at: Date;
  updated_at: Date;
  is_complete: boolean;
  is_deleted: boolean;
}
export const validateTask = (task: Partial<Task>): task is Task => {
    return (
        typeof task.taskid === "string" &&
        typeof task.title === "string" &&
        Array.isArray(task.labels) &&
        typeof task.description === "string" &&
        (task.due_date instanceof Date || task.due_date === null) &&
        typeof task.priority === "number" &&
        task.created_at instanceof Date &&
        task.updated_at instanceof Date &&
        typeof task.is_complete === "boolean" &&
        typeof task.is_deleted === "boolean"
    );
};