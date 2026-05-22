import Quadrant from "./Quadrant";

const QUADRANTS = [
  {
    key: "urgent-important",
    label: "Do First",
    subtitle: "Urgent & Important",
    border: "border-red-500",
    heading: "text-red-400",
  },
  {
    key: "urgent-not-important",
    label: "Delegate",
    subtitle: "Urgent & Not Important",
    border: "border-amber-500",
    heading: "text-amber-400",
  },
  {
    key: "not-urgent-important",
    label: "Schedule",
    subtitle: "Not Urgent & Important",
    border: "border-violet-500",
    heading: "text-violet-400",
  },
  {
    key: "not-urgent-not-important",
    label: "Eliminate",
    subtitle: "Not Urgent & Not Important",
    border: "border-zinc-600",
    heading: "text-zinc-500",
  },
];

export default function MatrixView({ tasks, onUpdate, onDelete }) {
  const filtered = {
    "urgent-important": tasks.filter((t) => t.urgent && t.important),
    "urgent-not-important": tasks.filter((t) => t.urgent && !t.important),
    "not-urgent-important": tasks.filter((t) => !t.urgent && t.important),
    "not-urgent-not-important": tasks.filter((t) => !t.urgent && !t.important),
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {QUADRANTS.map((q) => (
        <Quadrant
          key={q.key}
          {...q}
          tasks={filtered[q.key]}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}