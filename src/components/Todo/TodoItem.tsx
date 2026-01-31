import React from 'react';
import { Trash2, Check } from 'lucide-react';
import { Task, Priority } from './TodoApp';

interface TodoItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPriorityChange: (id: string, priority: Priority) => void;
}

const priorityLabels: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

const TodoItem: React.FC<TodoItemProps> = ({ task, onToggle, onDelete, onPriorityChange }) => {
  const priorityClass = `priority-${task.priority}`;

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-200 animate-fade-in ${
        task.completed ? 'bg-muted/50 border-border' : 'bg-card border-border hover:border-primary/30'
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          task.completed
            ? 'bg-primary border-primary text-primary-foreground'
            : 'border-muted-foreground hover:border-primary'
        }`}
      >
        {task.completed && <Check size={14} />}
      </button>

      {/* Task Text */}
      <span
        className={`flex-1 transition-all duration-200 ${
          task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
        }`}
      >
        {task.text}
      </span>

      {/* Priority Badge */}
      <select
        value={task.priority}
        onChange={(e) => onPriorityChange(task.id, e.target.value as Priority)}
        className={`text-xs px-2 py-1 rounded-md border font-medium cursor-pointer ${priorityClass}`}
      >
        {Object.entries(priorityLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(task.id)}
        className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-200"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default TodoItem;
