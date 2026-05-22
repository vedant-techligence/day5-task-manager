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
      <aside className="w-72 min-h-screen bg-zinc-900 border-r border-zinc-800 flex flex-col shrink-0">
        <div className="px-5 pt-6 pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <span className="text-violet-400 text-lg leading-none">✦</span>
            <h1 className="text-base font-bold text-white tracking-tight">
              Task Manager
            </h1>
          </div>
          <p className="text-zinc-600 text-xs mt-1 ml-7">Synced to database</p>
        </div>

        <div className="px-5 py-3 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold leading-none">
                {username.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-zinc-300 text-xs font-medium truncate">
              {username}
            </span>
          </div>
          <button
            onClick={onLogout}
            title="Sign out"
            className="flex items-center gap-1.5 text-xs text-zinc-600 hover:text-red-400 hover:bg-red-500/10 px-2 py-1 rounded-md transition-all duration-200 shrink-0"
          >
            <span>↩</span>
            <span>Logout</span>
          </button>
        </div>

        <div className="flex-1 px-5 py-5 flex flex-col gap-6 overflow-y-auto">
          {loading ? (
            <div className="flex items-center gap-2 text-zinc-600 text-xs animate-pulse">
              <span className="w-3 h-3 border-2 border-zinc-600 border-t-zinc-400 rounded-full animate-spin" />
              Loading…
            </div>
          ) : (
            <>
              <Summary tasks={tasks} />
              <div className="border-t border-zinc-800" />
              <TaskInput onAdd={handleAdd} />
            </>
          )}
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-zinc-600 text-sm animate-pulse">
              Loading tasks…
            </p>
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 min-h-full">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                  {view === "list" ? "All Tasks" : "Eisenhower Matrix"}
                </h2>
                {tasks.length > 0 && (
                  <span className="text-xs bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-full">
                    {tasks.length}
                  </span>
                )}
              </div>

              <div className="flex bg-zinc-800 rounded-lg p-1 gap-1">
                <button
                  onClick={() => setView("list")}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-all duration-200 ${
                    view === "list"
                      ? "bg-zinc-700 text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  ☰ List
                </button>
                <button
                  onClick={() => setView("matrix")}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-all duration-200 ${
                    view === "matrix"
                      ? "bg-zinc-700 text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  ⊞ Matrix
                </button>
              </div>
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