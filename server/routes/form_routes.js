const express = require('express')
const router = express.Router()
const { submitExercise, retrieveExercise } = require('../controllers/form_controller')

router.get('/exercises', retrieveExercise)
router.post('/submit', submitExercise)

module.exports = router