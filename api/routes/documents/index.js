const express = require('express');
const router = express.Router({ mergeParams: true });

// Middlewares
const utils = require('./utils');

// Controllers
const { getAllDocuments, createDocument } = require('./controllers');

// Routes
router.route('/').post(createDocument).get(getAllDocuments);

module.exports = router;
