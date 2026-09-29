const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: String, required: true },
    restTime: { type: Number, default: 0 },
    kgs: { type: Number, default: 0 },
    time: { type: String, default: "" },
    day: { type: String, default: "Monday" },
    focus: { type: String, default: "TRAINING" },
  },
  { _id: false },
);

const workoutSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, index: true },
    title: { type: String, required: true },
    goal: { type: String, required: true },
    height: { type: String, required: true },
    weight: { type: String, required: true },
    current_workout: { type: String, default: "" },
    workout_frequency: { type: Number, required: true },
    durationMinutes: Number,
    exercises: { type: [exerciseSchema], required: true },
    whyThisPlan: { type: String, default: "" },
    whyTitle: { type: String, default: "Designed around your goals" },
    source: { type: String, default: "ai-generated" },
    sourceDocumentIds: [{ type: mongoose.Schema.Types.ObjectId }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Workout", workoutSchema);
