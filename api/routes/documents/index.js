const express = require('express');
const router = express.Router({ mergeParams: true });

// Middlewares
const utils = require('./utils');

// Validators
const { validateRequestId } = require('./validators');

// Controllers
const { getAllDocuments, createDocument } = require('./controllers');

router.use(validateRequestId);

// Routes
router.route('/').post(createDocument).get(getAllDocuments);

module.exports = router;
