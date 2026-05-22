import TaskCard from "./TaskCard";

export default function Quadrant({
  label,
  subtitle,
  border,
  heading,
  tasks,
  onUpdate,
  onDelete,
}) {
  return (
    <div className={`bg-zinc-900 border-t-4 ${border} rounded-lg px-4 py-3`}>
      <div className="mb-3">
        <h2
          className={`text-xs font-bold uppercase tracking-widest ${heading}`}
        >
          {label}
        </h2>
        <p className="text-xs text-zinc-600 mt-0.5">{subtitle}</p>
      </div>
      {tasks.length === 0 ? (
        <p className="text-center text-zinc-700 text-xs mt-6">No tasks here.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}