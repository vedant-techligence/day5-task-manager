export default function Summary({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const percentage = total > 0 ? ((completed / total) * 100).toFixed(0) : 0;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
        Summary
      </p>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-zinc-800 rounded-lg px-3 py-2">
          <p className="text-xs text-zinc-500 mb-1">Total</p>
          <p className="text-2xl font-bold text-white">{total}</p>
        </div>
        <div className="bg-zinc-800 rounded-lg px-3 py-2">
          <p className="text-xs text-zinc-500 mb-1">Done</p>
          <p className="text-2xl font-bold text-emerald-400">{completed}</p>
        </div>
        <div className="bg-zinc-800 rounded-lg px-3 py-2">
          <p className="text-xs text-zinc-500 mb-1">Pending</p>
          <p className="text-2xl font-bold text-amber-400">{pending}</p>
        </div>
        <div className="bg-zinc-800 rounded-lg px-3 py-2">
          <p className="text-xs text-zinc-500 mb-1">Progress</p>
          <p className="text-2xl font-bold text-violet-400">{percentage}%</p>
        </div>
      </div>
      <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-1">
        <div
          className="bg-violet-500 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}