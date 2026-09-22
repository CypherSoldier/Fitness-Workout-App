import { Dumbbell, Edit3, MoreHorizontal, Trash2 } from "lucide-react";

const colorFor = (group = "") =>
  ["chest", "legs"].includes(group.toLowerCase())
    ? "bg-[#bfadff]"
    : ["back", "biceps"].includes(group.toLowerCase())
      ? "bg-[#f4c67a]"
      : "bg-[#69ddc0]";

function WorkoutCard({ exercise, onDelete, onEdit }) {
  const category = exercise.exercise
    ? `${exercise.exercise.charAt(0).toUpperCase()}${exercise.exercise.slice(1)}`
    : "Other";
    
  return (
    <article className="overflow-hidden rounded-[14px] border border-[#353d42] bg-[#22272b] transition hover:-translate-y-1 hover:border-[#53626b]">
      <div className="relative grid h-32 place-items-center bg-[#f2f5f5]">
        <Dumbbell
          size={68}
          strokeWidth={1.5}
          className="-rotate-12 text-[#15191a]"
        />
        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold text-[#152020] ${colorFor(exercise.exercise)}`}
        >
          {category}
        </span>
        <button
          aria-label={`More options for ${exercise.name}`}
          className="absolute left-2 top-2 rounded p-1 text-[#758087] hover:bg-black/5"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6f9b9d]">
              {exercise.day || "Unscheduled"}
            </span>
            <h3 className="truncate text-sm font-bold text-[#f5f7f8]">
              {exercise.name || "Untitled exercise"}
            </h3>
          </div>
          <span
            className="mt-2 size-2 shrink-0 rounded-full bg-[#48cfa1]"
            title="Logged"
          />
        </div>
        <div className="my-4 grid grid-cols-3 gap-2">
          {[
            ["Sets", exercise.sets],
            ["Reps", exercise.reps],
            ["Weight", exercise.kgs ? `${exercise.kgs} kg` : "—"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="grid justify-items-center gap-1 rounded-lg bg-[#1b2023] p-2"
            >
              <span className="text-[10px] text-[#8798a4]">{label}</span>
              <strong className="text-xs text-white">{value ?? "—"}</strong>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex h-9 flex-1 items-center justify-center gap-2 rounded-lg bg-[#12a879] text-xs font-bold text-white hover:bg-[#18bc89]"
          >
            <Edit3 size={15} /> Edit
          </button>
          <button
            onClick={onDelete}
            disabled={!exercise._id}
            aria-label={`Delete ${exercise.name}`}
            className="grid size-9 place-items-center rounded-lg bg-[#981c23] text-white hover:bg-[#b5262e] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
export default WorkoutCard;
