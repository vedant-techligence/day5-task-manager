import { useState, useEffect } from 'react'

import TaskList from './components/TaskList'
import TaskInput from './components/TaskInput'
import { createTask, getTasks, updateTask, deleteTask } from './api/tasks'

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(err => console.error('Failed to fetch tasks:', err))
      .finally(() => setLoading(false));
  }, []);

  function handleAdd(task) {
    createTask(task).then(newTask => {
      setTasks([...tasks, newTask]);
    });
  }

  function handleUpdate(id, updates) {
    updateTask(id, updates).then(updatedTask => {
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
    });
  }

  function handleDelete(id) {
    deleteTask(id).then(() => {
      setTasks(tasks.filter(t => t.id !== id));
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Manager</h1>
        {loading ? (
          <p className="text-gray-400 text-sm">Loading tasks...</p>
        ) : (
          <>
            <TaskInput title={title} setTitle={setTitle} onAdd={handleAdd} />
            <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
          </>
        )}
      </div>
    </div>
  )
}

export default App