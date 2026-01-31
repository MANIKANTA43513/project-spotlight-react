import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import TodoItem from './TodoItem';
import FilterControls from './FilterControls';

export type Priority = 'low' | 'medium' | 'high';
export type FilterType = 'all' | 'active' | 'completed';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
}

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('todo-tasks', []);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [filter, setFilter] = useState<FilterType>('all');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task: Task = {
      id: crypto.randomUUID(),
      text: newTask.trim(),
      completed: false,
      priority,
      createdAt: Date.now(),
    };

    setTasks([task, ...tasks]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updatePriority = (id: string, newPriority: Priority) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, priority: newPriority } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  };

  return (
    <div className="task-card">
      <h2 className="section-title">📝 Todo App</h2>

      {/* Add Task Form */}
      <form onSubmit={addTask} className="mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What needs to be done?"
            className="input-base flex-1"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="input-base w-32"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button type="submit" className="btn-primary flex items-center gap-2">
            <Plus size={18} />
            Add
          </button>
        </div>
      </form>

      {/* Filter Controls */}
      <FilterControls filter={filter} setFilter={setFilter} stats={stats} />

      {/* Task List */}
      <div className="space-y-2 mt-4">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            {filter === 'all' ? 'No tasks yet. Add one above!' : `No ${filter} tasks`}
          </p>
        ) : (
          filteredTasks.map(task => (
            <TodoItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onPriorityChange={updatePriority}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoApp;
