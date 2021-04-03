const express = require('express');

const router = express.Router()

const authRequired = require('../../middleware/authRequired')
const restrictTo = require('../../middleware/restrictTo')

// Controllers
const {
    getAllPrograms,
    createProgram,
    getProgramById,
    updateProgramById,
    deleteProgramById
} = require('./controllers');

// validators
const { validateProgramId, validateCreateProgram , validateUpdateProgram} = require('./validators')

// Global middleware
router.use(authRequired)
router.use(restrictTo('programManager', 'admin'))

// Routes
router.route('/').get(getAllPrograms).post(validateCreateProgram,createProgram)

router.route('/:id').all(validateProgramId).get(getProgramById).put(validateUpdateProgram,updateProgramById).delete(deleteProgramById)

module.exports = router;