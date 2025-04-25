"use client";

import React from "react";
import { Task } from "../types/task";

const TodoDetail: React.FC<Task> = (task) => {
  if (!task) {
    return <div>タスクが選択されていません。</div>;
  }

  return (
    <div className="flex-1 shrink-0 w-[26rem] h-full bg-white shadow-md rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
        <p className="mb-2"><strong>説明:</strong> {task.description}</p>
        <p className="mb-2"><strong>期限:</strong> {task.due_date ? task.due_date.toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" }) : "なし"}</p>
        <p className="mb-2"><strong>優先度:</strong> {task.priority}</p>
        <p className="mb-2"><strong>作成日:</strong> {task.created_at.toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" })}</p>
        <p className="mb-2"><strong>更新日:</strong> {task.updated_at.toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" })}</p>
        <p className="mb-2"><strong>完了:</strong> {task.is_complete ? "はい" : "いいえ"}</p>
        <p className="mb-2"><strong>削除済み:</strong> {task.is_deleted ? "はい" : "いいえ"}</p>
        <div className="mt-4">
            <strong>ラベル:</strong>
            <ul className="list-disc list-inside">
                {task.labels.map((label, index) => (
                    <li key={index}>{label}</li>
                ))}
            </ul>
        </div>
    </div>
  );
};

export default TodoDetail;
