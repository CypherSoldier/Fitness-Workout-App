const express = require('express')
const router = express.Router()
const { submitExercise, retrieveExercise, deleteExercise } = require('../controllers/form_controller')

router.get('/exercises', retrieveExercise)
router.post('/submit', submitExercise)
router.delete('/exercises/:id', deleteExercise)

module.exports = router