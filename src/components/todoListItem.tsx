import React from 'react';
import Link from 'next/link';
import { Task } from '../types/task';

const TodoListItem: React.FC<Task> = (task) => {
  return (
    <Link href={`/${task.taskid}`}>
      <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', cursor: 'pointer' }}>
        <h3 style={{ textDecoration: task.is_complete ? 'line-through' : 'none' }}>{task.title}</h3>
        <p>{task.description}</p>
        <p>Priority: {task.priority}</p>
        <p>Status: {task.is_complete ? 'Completed' : 'Pending'}</p>
      </div>
    </Link>
  );
};

export default TodoListItem;