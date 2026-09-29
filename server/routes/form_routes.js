const express = require("express");
const router = express.Router();
const {
  submitExercise,
  retrieveExercise,
  updateExercise,
  deleteExercise,
} = require("../controllers/form_controller");
const validateToken = require("../middleware/validateTokenHandler");

router.get("/exercises", validateToken, retrieveExercise);
router.post("/submit", validateToken, submitExercise);
router.put("/exercises/:id", validateToken, updateExercise);
router.delete("/exercises/:id", validateToken, deleteExercise);

module.exports = router;
