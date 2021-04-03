const express = require('express');
const authRequired = require('../../middleware/authRequired');

const router = express.Router();

// Middlewares
const restrictTo = require('../../middleware/restrictTo');

// Controllers
const {
  getAllOrganizations,
  createOrganization,
  getOrganizationById,
  updateOrganizationById,
  deleteOrganizationById,
  getAllProgramsByOrganizationId,
  createProgram
  
} = require('./controllers');

// These middewares will run for every route
router.use(authRequired, restrictTo('admin'));

router.route('/').get(getAllOrganizations).post(createOrganization);

router
  .route('/:id')
  .get(getOrganizationById)
  .put(updateOrganizationById)
  .delete(deleteOrganizationById);

router.route('/:id/programs').get(getAllProgramsByOrganizationId).post(createProgram)

module.exports = router;
