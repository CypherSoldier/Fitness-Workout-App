import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Loader2,
  Plus,
  RotateCcw,
  Save,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import DaySidebar from "../components/DaySidebar";
import Navbar from "../components/Navbar";
import { getApiAuthHeaders } from "../services/apiAuth";

const configuredApiBase = process.env.REACT_APP_API_BASE?.replace(/\/+$/, "");
const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);
const API = configuredApiBase
  ? `${configuredApiBase}/api/workouts`
  : isLocal
    ? "http://localhost:5000/api/workouts"
    : "";
const blank = {
  height: "",
  weight: "",
  goals: "",
  current_workout: "",
  workout_frequency: 3,
  durationMinutes: 60,
};
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

async function readApiResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error(
      configuredApiBase
        ? `The workout API returned a non-JSON page (HTTP ${response.status}). Check that the backend is deployed with the /api/workouts routes.`
        : "The backend URL is not configured. Set REACT_APP_API_BASE to the Express API URL and rebuild the app.",
    );
  }
  const data = await response.json();
  if (!response.ok)
    throw new Error(
      data.message || `Workout request failed (HTTP ${response.status}).`,
    );
  return data;
}

export default function GenerateWorkout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [answers, setAnswers] = useState(blank);
  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const getHeaders = async () => ({
    ...(await getApiAuthHeaders()),
    "Content-Type": "application/json",
  });

  const change = (key) => (event) =>
    setAnswers((current) => ({ ...current, [key]: event.target.value }));
  const generate = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);
    try {
      if (!API)
        throw new Error(
          "The backend URL is not configured. Set REACT_APP_API_BASE to the Express API URL and rebuild the app.",
        );
      const response = await fetch(`${API}/generate`, {
        method: "POST",
        headers: await getHeaders(),
        body: JSON.stringify({
          ...answers,
          workout_frequency: Number(answers.workout_frequency),
          durationMinutes: Number(answers.durationMinutes),
        }),
      });
      const body = await readApiResponse(response);
      setDraft({ ...body, exercises: (body.exercises || []).map((exercise) => ({ day: "Monday", focus: "TRAINING", ...exercise })) });
      setNotice(
        "Your workout draft is ready. Edit it, then save your changes.",
      );
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  const updateExercise = (index, key, value) =>
    setDraft((current) => ({
      ...current,
      exercises: current.exercises.map((exercise, i) =>
        i === index ? { ...exercise, [key]: value } : exercise,
      ),
    }));
  const save = async () => {
    setError("");
    setNotice("");
    setLoading(true);
    try {
      const response = await fetch(`${API}/${draft._id}`, {
        method: "PUT",
        headers: await getHeaders(),
        body: JSON.stringify({
          title: draft.title,
          goal: draft.goal,
          exercises: draft.exercises,
          whyThisPlan: draft.whyThisPlan,
          whyTitle: draft.whyTitle,
        }),
      });
      const body = await readApiResponse(response);
      setDraft({ ...body, availableExercises: draft.availableExercises || body.availableExercises || [] });
      setNotice("Workout changes saved.");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  const downloadMarkdown = () => {
    const content = `# ${draft.title || "Generated workout"}\n\n**Goal:** ${draft.goal || ""}\n\n${draft.exercises.map((item) => `## ${item.name}\n- Sets: ${item.sets}\n- Reps: ${item.reps}\n- Rest: ${item.restTime} seconds\n- Load: ${item.kgs} kg${item.time ? `\n- Time: ${item.time}` : ""}`).join("\n\n")}`;
    const url = URL.createObjectURL(
      new Blob([content], { type: "text/markdown" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "workout-plan.md";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen bg-[#191e21] text-white">
      <DaySidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {sidebarOpen && (
        <button
          aria-label="Close navigation overlay"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-10 bg-black/50 lg:hidden"
        />
      )}
      <div className="min-w-0 flex-1">
        <Navbar onOpenMenu={() => setSidebarOpen(true)} />
        <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-12">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
          >
            <ArrowLeft size={16} /> Back to dashboard
          </Link>
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold tracking-[.18em] text-emerald-300">
                <Sparkles size={15} /> AI WORKOUT BUILDER
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                Build a plan that fits you
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                Share your goals and training context. Gemini will select the
                most relevant movements from your stored workout records.
              </p>
            </div>
          </div>
          {error && (
            <div
              role="alert"
              className="mb-4 rounded-lg border border-red-500/40 bg-red-950/40 p-3 text-sm text-red-200"
            >
              {error}
            </div>
          )}
          {notice && (
            <div
              role="status"
              className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-950/30 p-3 text-sm text-emerald-200"
            >
              {notice}
            </div>
          )}
          {!draft ? (
            <form
              onSubmit={generate}
              className="grid gap-5 lg:grid-cols-[1fr_1fr]"
            >
              <section className="rounded-2xl border border-[#353d42] bg-[#22282c] p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl border border-emerald-500/30 bg-emerald-900/30 text-emerald-300">
                    <Bot size={19} />
                  </span>
                  <div>
                    <h3 className="font-semibold">Your training context</h3>
                    <p className="text-xs text-slate-400">
                      A few details help tailor your plan.
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-xs font-semibold text-slate-300">
                    Weight
                    <input
                      required
                      value={answers.weight}
                      onChange={change("weight")}
                      placeholder="e.g. 78 kg"
                      className="mt-2 h-11 w-full rounded-lg border border-[#414b51] bg-[#191e21] px-3 text-sm text-white outline-none focus:border-emerald-400"
                    />
                  </label>
                  <label className="text-xs font-semibold text-slate-300">
                    Height
                    <input
                      required
                      value={answers.height}
                      onChange={change("height")}
                      placeholder="e.g. 180 cm"
                      className="mt-2 h-11 w-full rounded-lg border border-[#414b51] bg-[#191e21] px-3 text-sm text-white outline-none focus:border-emerald-400"
                    />
                  </label>
                  <label className="text-xs font-semibold text-slate-300 sm:col-span-2">
                    Main goal
                    <textarea
                      required
                      value={answers.goals}
                      onChange={change("goals")}
                      placeholder="Get lean, build strength, lean bulk…"
                      rows={2}
                      className="mt-2 w-full rounded-lg border border-[#414b51] bg-[#191e21] p-3 text-sm text-white outline-none focus:border-emerald-400"
                    />
                  </label>
                  <label className="text-xs font-semibold text-slate-300 sm:col-span-2">
                    Current routine
                    <input
                      value={answers.current_workout}
                      onChange={change("current_workout")}
                      placeholder="PPL, upper/lower, or getting started"
                      className="mt-2 h-11 w-full rounded-lg border border-[#414b51] bg-[#191e21] px-3 text-sm text-white outline-none focus:border-emerald-400"
                    />
                  </label>
                  <label className="text-xs font-semibold text-slate-300">
                    Days per week
                    <input
                      type="number"
                      min="1"
                      max="7"
                      value={answers.workout_frequency}
                      onChange={change("workout_frequency")}
                      className="mt-2 h-11 w-full rounded-lg border border-[#414b51] bg-[#191e21] px-3 text-sm text-white outline-none focus:border-emerald-400"
                    />
                  </label>
                  <label className="text-xs font-semibold text-slate-300">
                    Minutes per session
                    <input
                      type="number"
                      min="15"
                      max="240"
                      value={answers.durationMinutes}
                      onChange={change("durationMinutes")}
                      className="mt-2 h-11 w-full rounded-lg border border-[#414b51] bg-[#191e21] px-3 text-sm text-white outline-none focus:border-emerald-400"
                    />
                  </label>
                </div>
              </section>
              <section className="flex flex-col justify-between rounded-2xl border border-[#353d42] bg-[#22282c] p-5 sm:p-6">
                <div>
                  <h3 className="font-semibold">
                    Personalized from your history
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Your saved exercises and training details are sent securely
                    to Gemini. It selects the movements that best fit your goal
                    and weekly schedule.
                  </p>
                  <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4 text-sm text-emerald-100">
                    Only records owned by your account are included in the
                    request.
                  </div>
                </div>
                <button
                  disabled={loading}
                  className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 text-sm font-bold text-[#10211d] transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={17} />
                  ) : (
                    <>
                      Generate my plan <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </section>
            </form>
          ) : (
            <section className="rounded-2xl border border-[#353d42] bg-[#22282c] p-5 sm:p-6">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold tracking-widest text-emerald-300">
                    GENERATED WORKOUT
                  </p>
                  <input
                    aria-label="Workout title"
                    value={draft.title || ""}
                    onChange={(e) =>
                      setDraft({ ...draft, title: e.target.value })
                    }
                    className="mt-2 w-full border-b border-[#414b51] bg-transparent pb-1 text-2xl font-bold outline-none focus:border-emerald-400"
                  />
                </div>
                <button
                  onClick={() => {
                    setDraft(null);
                    setAnswers(blank);
                    setNotice("");
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#414b51] px-3 py-2 text-sm text-slate-300 hover:text-white"
                >
                  <RotateCcw size={15} /> Start over
                </button>
              </div>
              <label className="mb-5 block text-xs font-semibold text-slate-300">
                Goal
                <input
                  value={draft.goal || ""}
                  onChange={(e) => setDraft({ ...draft, goal: e.target.value })}
                  className="mt-2 h-10 w-full rounded-lg border border-[#414b51] bg-[#191e21] px-3 text-sm outline-none focus:border-emerald-400"
                />
              </label>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {weekdays.map((day) => {
                  const dayExercises = draft.exercises.filter((item) => item.day === day);
                  const focus = dayExercises[0]?.focus || (dayExercises.length ? "TRAINING" : "REST");
                  return (
                    <article key={day} className="min-h-32 rounded-xl border border-[#353d42] bg-[#1b2023] p-3">
                      <div className="mb-2 flex items-center justify-between gap-2 border-b border-[#353d42] pb-2">
                        <h3 className="text-sm font-bold">{day}</h3>
                        <input aria-label={`${day} focus`} value={focus} onChange={(e) => dayExercises.forEach((item) => updateExercise(draft.exercises.indexOf(item), "focus", e.target.value))} placeholder="REST" className="w-24 bg-transparent text-right text-[10px] font-bold text-teal-300 outline-none" />
                      </div>
                      <div className="space-y-2">
                        {dayExercises.map((exercise) => {
                          const index = draft.exercises.indexOf(exercise);
                          return <div key={`${index}-${exercise.name}`} className="group rounded-md border border-transparent p-1 hover:border-[#353d42]">
                            <div className="flex items-center gap-1">
                              <select aria-label={`${day} exercise name`} value={exercise.name} onChange={(e) => updateExercise(index, "name", e.target.value)} className="min-w-0 flex-1 bg-[#22282c] text-xs text-slate-100 outline-none">
                                <option value="">Choose saved exercise</option>
                                {(draft.availableExercises || []).map((item) => <option key={item._id} value={item.name}>{item.name}</option>)}
                              </select>
                              <button aria-label={`Remove ${exercise.name || "exercise"}`} onClick={() => setDraft({ ...draft, exercises: draft.exercises.filter((_, i) => i !== index) })} className="text-slate-500 hover:text-red-300"><Trash2 size={12} /></button>
                            </div>
                            <div className="mt-1 grid grid-cols-[1fr_1fr] gap-1 text-[10px] text-slate-400">
                              <label>Sets <input type="number" min="1" value={exercise.sets} onChange={(e) => updateExercise(index, "sets", e.target.value)} className="w-full rounded bg-[#22282c] px-1 py-0.5 text-white" /></label>
                              <label>Reps <input value={exercise.reps} onChange={(e) => updateExercise(index, "reps", e.target.value)} className="w-full rounded bg-[#22282c] px-1 py-0.5 text-white" /></label>
                              <label>Rest sec <input type="number" min="0" value={exercise.restTime} onChange={(e) => updateExercise(index, "restTime", e.target.value)} className="w-full rounded bg-[#22282c] px-1 py-0.5 text-white" /></label>
                              <label>Load kg <input type="number" min="0" value={exercise.kgs} onChange={(e) => updateExercise(index, "kgs", e.target.value)} className="w-full rounded bg-[#22282c] px-1 py-0.5 text-white" /></label>
                            </div>
                          </div>;
                        })}
                        {!dayExercises.length && <p className="py-1 text-xs text-slate-400">Recovery or rest</p>}
                      </div>
                      <button onClick={() => setDraft({ ...draft, exercises: [...draft.exercises, { day, focus: "TRAINING", name: "", sets: 3, reps: "8–12", restTime: 90, kgs: 0, time: "" }] })} className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-teal-300 hover:text-teal-200"><Plus size={12} /> Add exercise</button>
                    </article>
                  );
                })}
              </div>
              <section className="mt-4 rounded-xl border border-[#353d42] bg-[#1b2023] p-4 sm:p-5">
                <div className="flex gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-emerald-500/30 bg-emerald-900/30 text-emerald-300"><Bot size={17} /></span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold tracking-[.16em] text-teal-300">WHY THIS PLAN</p>
                    <input aria-label="Reasoning heading" value={draft.whyTitle || "Designed around your goals"} onChange={(e) => setDraft({ ...draft, whyTitle: e.target.value })} className="mt-1 w-full bg-transparent text-base font-bold text-white outline-none" />
                    <textarea aria-label="Why this plan" rows={3} value={draft.whyThisPlan || "This plan balances focused training with recovery days, using exercises from your workout history and rep ranges suited to your goal."} onChange={(e) => setDraft({ ...draft, whyThisPlan: e.target.value })} className="mt-2 w-full resize-y bg-transparent text-xs leading-5 text-slate-400 outline-none" />
                  </div>
                </div>
              </section>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  disabled={loading}
                  onClick={save}
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-500 px-4 text-sm font-bold text-[#10211d] hover:bg-emerald-400 disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}{" "}
                  Save workout
                </button>
                <button
                  onClick={downloadMarkdown}
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#414b51] px-4 text-sm text-slate-200 hover:border-emerald-400"
                >
                  Download .md
                </button>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
