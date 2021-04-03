const express = require('express');

const router = express.Router()

// Controllers
const {
    getAllPrograms,
    createProgram,
    getProgramById,
    updateProgramById,
    deleteProgramById
} = require('./controllers');

// Global middleware

// Routes
router.route('/').get(getAllPrograms).post(createProgram)

router.route('/:id').get(getProgramById).put(updateProgramById).delete(deleteProgramById)

module.exports = router;