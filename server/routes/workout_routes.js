const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const {
  generateWorkout,
  updateGeneratedWorkout,
} = require("../controllers/workout_controller");

const router = express.Router();
router.post("/generate", validateToken, generateWorkout);
router.put("/:id", validateToken, updateGeneratedWorkout);

module.exports = router;
