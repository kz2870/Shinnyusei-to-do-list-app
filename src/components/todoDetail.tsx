"use client";

import React from "react";
import { Task } from "../types/task";
import APIManager from "../utils/APIManager";

interface TodoDetailProps {
  task: Task;
  switchEdit: () => void;
}

const TodoDetail: React.FC<TodoDetailProps> = ({ task, switchEdit }) => {
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
    <div className="flex-1 relative shrink-0 w-[26rem] h-full bg-white shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">

        <button
          className="px-2 cursor-pointer"
          onClick={() => { }}
        >
          <i className={`w-[1.5rem] h-[1.5rem] align-text-top ${task.is_deleted ? "i-mdi-delete-outline" : (task.is_complete ? "i-mdi-check-circle-outline" : "i-mdi-checkbox-blank-circle-outline")}`} />
        </button>
        <h2 className="grow text-2xl font-bold">{task.title}
        </h2>
      </div>
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
      <button
        className="flex items-center justify-center absolute bottom-4 right-4 bg-blue-500 text-white p-2 w-12 h-12 rounded-full shadow-md hover:bg-blue-600"
        onClick={() => switchEdit()}
      >
        <i className="i-mdi-pencil w-[1.5rem] h-[1.5rem]"></i>
      </button>
    </div>
  );
};

export default TodoDetail;
