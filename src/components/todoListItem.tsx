import React from 'react';
import Link from 'next/link';
import { Task } from '../types/task';

import APIManager from '../utils/APIManager';

const TodoListItem: React.FC<Task> = (initialTask) => {
  const [task, setTask] = React.useState(initialTask);
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
    <Link href={`/${task.taskid}`}>
      <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', cursor: 'pointer' }}>
        <h3 style={{ textDecoration: task.is_deleted ? 'line-through' : 'none' }}>
          <i
            className={`w-[1.5rem] align-text-top ${
            task.is_deleted ? "i-mdi-delete-outline" : (task.is_complete ? "i-mdi-check-circle-outline" : "i-mdi-checkbox-blank-circle-outline")
          }`}
            onClick={async (e) => {
              e.preventDefault();
              if (!task.is_deleted) {
                const apiManager = APIManager.getInstance();
                const updatedTask = { ...task, is_complete: !task.is_complete };
                await apiManager.updateTask(task.taskid, { is_complete: updatedTask.is_complete });
                setTask(updatedTask);
              }
            }}
          /> {task.title}</h3>
        <p>{task.description}</p>
        <p>Priority: {task.priority}</p>
        <p>Status: {task.is_complete ? 'Completed' : 'Pending'}</p>
        <div>
          <strong>Labels:</strong> {labelNames.join(', ')}
        </div>
      </div>
    </Link>
  );
};

export default TodoListItem;
