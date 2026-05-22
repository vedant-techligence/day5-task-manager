import { useState } from "react";

export default function TaskCard({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState("");
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleToggle() {
    setUpdating(true);
    setError("");
    try {
      await onUpdate(task.id, { completed: task.completed ? 0 : 1 });
    } catch {
      setError("Failed to update task.");
    } finally {
      setUpdating(false);
    }
  }

  async function handleSave() {
    if (!editingTitle.trim()) return;
    setUpdating(true);
    setError("");
    try {
      await onUpdate(task.id, { title: editingTitle.trim() });
      setIsEditing(false);
      setEditingTitle("");
    } catch {
      setError("Failed to save changes.");
    } finally {
      setUpdating(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    setError("");
    try {
      await onDelete(task.id);
    } catch {
      setError("Failed to delete task.");
      setDeleting(false);
    }
  }

  return (
    <li
      className={`flex flex-col gap-2 bg-zinc-800 border-l-4 ${task.completed ? "border-emerald-500" : "border-zinc-600"} rounded-lg px-4 py-3 ${deleting ? "opacity-50 pointer-events-none" : ""}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`text-sm flex-1 ${task.completed ? "line-through text-zinc-500" : "text-zinc-200"}`}
        >
          {task.title}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={handleToggle}
            disabled={updating}
            title={task.completed ? "Mark incomplete" : "Mark complete"}
            className={`p-1.5 rounded-md transition-colors ${task.completed ? "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-700" : "text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"} disabled:opacity-50`}
          >
            {task.completed ? "↩" : "✓"}
          </button>
          <button
            onClick={() => {
              setIsEditing(true);
              setEditingTitle(task.title);
            }}
            title="Edit"
            className="p-1.5 rounded-md text-zinc-400 hover:text-violet-400 hover:bg-violet-500/10 transition-colors"
          >
            ✎
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            title="Delete"
            className="p-1.5 rounded-md text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
          >
            {deleting ? "..." : "✕"}
          </button>
        </div>
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      {isEditing && (
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
            className="flex-1 bg-zinc-700 border border-zinc-600 rounded-md px-3 py-1 text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          />
          <button
            onClick={handleSave}
            disabled={updating}
            className="text-xs px-3 py-1 bg-violet-600 hover:bg-violet-500 text-white rounded-md transition-colors disabled:opacity-50"
          >
            {updating ? "..." : "Save"}
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditingTitle("");
              setError("");
            }}
            className="text-xs px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 rounded-md transition-colors"
          >
            ✕
          </button>
        </div>
      )}
    </li>
  );
}