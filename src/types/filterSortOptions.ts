export interface FilterOptions {
  is_complete: "any" | "true" | "false";
  is_deleted: "any" | "true" | "false";
  labels: string[];
}

export interface SortOptions {
  orderBy: "title" | "due_date" | "priority" | "created_at";
}