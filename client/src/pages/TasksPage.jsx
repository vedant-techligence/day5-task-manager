import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import TaskInput from "../components/TaskInput";
import Summary from "../components/Summary";
import MatrixView from "../components/MatrixView";
import { createTask, getTasks, updateTask, deleteTask } from "../api/tasks";

export default function TasksPage({ username, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((err) => console.error("Failed to fetch tasks:", err))
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(task) {
    const newTask = await createTask(task);
    setTasks([...tasks, newTask]);
  }

  async function handleUpdate(id, updates) {
    const updatedTask = await updateTask(id, updates);
    setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
  }

  async function handleDelete(id) {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t.id !== id));
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      <aside className="w-72 min-h-screen bg-zinc-900 border-r border-zinc-800 p-5 flex flex-col gap-5 shrink-0">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            ✦ Task Manager
          </h1>
          <p className="text-zinc-500 text-xs mt-1">Synced to database.</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-zinc-400 text-xs">
            Signed in as{" "}
            <span className="text-white font-medium">{username}</span>
          </p>
          <button
            onClick={onLogout}
            className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>

        {!loading && (
          <>
            <Summary tasks={tasks} />
            <TaskInput onAdd={handleAdd} />
          </>
        )}
      </aside>

      <main className="flex-1 p-6">
        {loading ? (
          <p className="text-zinc-600 text-sm animate-pulse">
            Loading tasks...
          </p>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 h-full">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                {view === "list" ? "All Tasks" : "Matrix View"}
              </h2>
              <button
                onClick={() => setView(view === "list" ? "matrix" : "list")}
                className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-all"
              >
                {view === "list" ? "⊞ Matrix" : "☰ List"}
              </button>
            </div>
            {view === "list" ? (
              <TaskList
                tasks={tasks}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ) : (
              <MatrixView
                tasks={tasks}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}