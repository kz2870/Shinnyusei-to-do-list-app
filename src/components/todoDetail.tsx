"use client";

import React from "react";
import { Task } from "../types/task";

const TodoDetail: React.FC<Task> = (task) => {
  if (!task) {
    return <div>タスクが選択されていません。</div>;
  }

  return (
    <div className="todo-detail">
      <h2>{task.title}</h2>
      <p><strong>説明:</strong> {task.description}</p>
      <p><strong>期限:</strong> {task.due_date ? task.due_date.toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" }) : "なし"}</p>
      <p><strong>優先度:</strong> {task.priority}</p>
      <p><strong>作成日:</strong> {task.created_at.toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" })}</p>
      <p><strong>更新日:</strong> {task.updated_at.toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" })}</p>
      <p><strong>完了:</strong> {task.is_complete ? "はい" : "いいえ"}</p>
      <p><strong>削除済み:</strong> {task.is_deleted ? "はい" : "いいえ"}</p>
      <div>
        <strong>ラベル:</strong>
        <ul>
          {task.labels.map((label, index) => (
            <li key={index}>{label}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoDetail;
