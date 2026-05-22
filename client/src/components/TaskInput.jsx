import { useState } from "react";

export default function TaskInput({ onAdd }) {
  const [title, setTitle] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [important, setImportant] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task title cannot be empty");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await onAdd({
        title: title.trim(),
        urgent: urgent ? 1 : 0,
        important: important ? 1 : 0,
      });
      setTitle("");
      setUrgent(false);
      setImportant(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch {
      setError("Failed to add task. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
        New Task
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          placeholder="Task title..."
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
        />
        {error && <p className="text-red-400 text-xs">{error}</p>}
        {success && (
          <p className="text-emerald-400 text-xs">Task added successfully.</p>
        )}
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer hover:text-zinc-200 transition-colors">
            <input
              type="checkbox"
              checked={urgent}
              onChange={(e) => setUrgent(e.target.checked)}
              className="accent-red-400"
            />
            Urgent
          </label>
          <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer hover:text-zinc-200 transition-colors">
            <input
              type="checkbox"
              checked={important}
              onChange={(e) => setImportant(e.target.checked)}
              className="accent-violet-400"
            />
            Important
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Adding..." : "+ Add Task"}
        </button>
      </form>
    </div>
  );
}