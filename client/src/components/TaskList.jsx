import { useState } from "react";

export default function TaskList({ tasks, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-400 text-sm mt-10">
        No tasks yet. Add one above!
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex flex-col gap-2 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm"
        >
          <div className="flex items-center justify-between gap-2">
            <span
              className={`text-sm flex-1 ${task.completed ? "line-through text-gray-400" : "text-gray-700"}`}
            >
              {task.title}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() =>
                  onUpdate(task.id, { completed: task.completed ? 0 : 1 })
                }
                className={`text-xs px-3 py-1 rounded-md transition-colors ${
                  task.completed
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-600"
                    : "bg-green-100 hover:bg-green-200 text-green-700"
                }`}
              >
                {task.completed ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => {
                  setEditingId(task.id);
                  setEditingTitle(task.title);
                }}
                className="text-xs px-3 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="text-xs px-3 py-1 rounded-md bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>

          {editingId === task.id && (
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                onClick={() => {
                  if (!editingTitle.trim()) return;
                  onUpdate(task.id, { title: editingTitle.trim() });
                  setEditingId(null);
                  setEditingTitle("");
                }}
                className="text-xs px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditingId(null);
                  setEditingTitle("");
                }}
                className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}