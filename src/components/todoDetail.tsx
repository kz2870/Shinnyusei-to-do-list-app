"use client";

import React from "react";
import { Task } from "../types/task";
import APIManager from "../utils/APIManager";

const TodoDetail: React.FC<Task> = (task) => {
  if (!task) {
    return <div>タスクが選択されていません。</div>;
  }

  const [labelNames, setLabelNames] = React.useState<string[]>([]);

  React.useEffect(() => {
    const fetchLabels = async () => {
      const apiManager = APIManager.getInstance();
      const labels = await Promise.all(
        task.labels.map(async (labelId) => {
          const label = await apiManager.getLabelById(labelId);
          return label ? label.label_name : 'Unknown';
        })
      );
      setLabelNames(labels);
    };

    fetchLabels();
  }, [task.labels]);

  return (
    <div className="flex-1 shrink-0 w-[26rem] h-full bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">
        <i className={`w-[1.5rem] align-text-top ${task.is_deleted ? "i-mdi-delete-outline" : (task.is_complete ? "i-mdi-check-circle-outline" : "i-mdi-checkbox-blank-circle-outline")
          }`} />{task.title}
      </h2>
      <p className="mb-2"><strong>期限:</strong> {task.due_date ? task.due_date.toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" }) : "なし"}</p>
      <div className="mb-2">
        <p>
          <strong>ラベル: </strong>
          {labelNames.join(', ')}
        </p>
      </div>
      <p className="mb-2"><strong>説明:</strong> {task.description}</p>
      <p className="mb-2"><strong>優先度:</strong> {task.priority}</p>
      <p className="mb-2"><strong>作成日:</strong> {task.created_at.toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" })}</p>
      <p className="mb-2"><strong>更新日:</strong> {task.updated_at.toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" })}</p>
      <p className="mb-2"><strong>完了:</strong> {task.is_complete ? "はい" : "いいえ"}</p>
      <p className="mb-2"><strong>削除済み:</strong> {task.is_deleted ? "はい" : "いいえ"}</p>
    </div>
  );
};

export default TodoDetail;
