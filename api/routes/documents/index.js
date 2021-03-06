const express = require('express');
const router = express.Router();

// Controllers
const { getAllDocuments ,deleteDocument } = require('./controllers');

// Validators
const { checkIfDocumentExists } = require('./validators');


router.route('/').get(getAllDocuments)

router.route('/:id').all(checkIfDocumentExists).delete(deleteDocument);

module.exports = router;
