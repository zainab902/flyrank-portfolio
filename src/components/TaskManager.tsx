import React, { useState, useEffect } from 'react';

interface Task {
  id: string;
  title: string;
  priority: 'Low' | 'Medium' | 'High';
  category: string;
  completed: boolean;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [category, setCategory] = useState('Work');
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Pending'>('All');

  // Load tasks safely after initial component mount
  useEffect(() => {
    const saved = localStorage.getItem('flyrank_tasks');
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse tasks", e);
      }
    }
  }, []);

  // Sync tasks to localStorage whenever state updates
  useEffect(() => {
    localStorage.setItem('flyrank_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      priority,
      category,
      completed: false
    };

    setTasks(prev => [...prev, newTask]);
    setTitle('');
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Pending') return !task.completed;
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-900 text-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-indigo-400">Smart Task Manager</h2>
      
      {/* Task Input Form */}
      <form onSubmit={handleAddTask} className="space-y-4 mb-8">
        <div>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            className="w-1/2 p-3 rounded bg-slate-800 border border-slate-700 text-white"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <input
            type="text"
            placeholder="Category (e.g., Work)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-1/2 p-3 rounded bg-slate-800 border border-slate-700 text-white placeholder-slate-500"
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 p-3 rounded font-bold transition">
          Add Task
        </button>
      </form>

      {/* Task Filter Toolbar */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-slate-400 text-sm">{filteredTasks.length} tasks matching filter</span>
        <div className="flex gap-2">
          {['All', 'Pending', 'Completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-3 py-1 text-xs rounded transition ${
                filter === f ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between p-4 bg-slate-800 border border-slate-700 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-5 h-5 rounded border-slate-600 text-indigo-600 focus:ring-indigo-500 bg-slate-700"
              />
              <div className="flex flex-col">
                <span className={`text-base ${task.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                  {task.title}
                </span>
                <span className="text-xs text-slate-400">
                  {task.category} • <span className={`font-semibold ${
                    task.priority === 'High' ? 'text-red-400' : task.priority === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                  }`}>{task.priority}</span>
                </span>
              </div>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-slate-500 hover:text-red-400 text-sm transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}