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