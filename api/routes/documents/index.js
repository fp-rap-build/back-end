const express = require('express');
const router = express.Router();

// Controllers
const { deleteDocument } = require('./controllers');

// Validators
const { checkIfDocumentExists } = require('./validators');

router.route('/:id').all(checkIfDocumentExists).delete(deleteDocument);

module.exports = router;
