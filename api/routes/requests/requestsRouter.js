const express = require('express');
const Requests = require('./requestsModel');
const restrictTo = require('../../middleware/restrictTo');

// Middlewares
const utils = require('./documents/utils');

// Validators
const { validateRequestId } = require('./documents/validators');

// Controllers
const { getAllDocuments, createDocument } = require('./documents/controllers');

const router = express.Router();

router.post('/', async (req, res) => {
	const { id } = req.user;

	try {
		const request = req.body;

		request['userId'] = id;

		const newRequest = await Requests.create(request);
		res.status(200).json(newRequest);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

router.get('/', async (req, res) => {
	try {
		const allRequests = await Requests.findAll();
		res.status(200).json({ requests: allRequests });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

//View all active requests
router.get('/active', async (req, res) => {
	try {
		const resRequests = await Requests.findAllActive();
		res.status(200).json(resRequests);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

//Endpoint tailored for req table
//Updates to shape data should be done in model @ 'findForTable'
router.get('/table', async (req, res) => {
	try {
		const resRequests = await Requests.findForTable();
		res.status(200).json(resRequests);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

router.get('/find', async (req, res) => {
	const filter = req.body;
	try {
		const foundRequests = await Requests.findBy(filter);
		res.status(200).json(foundRequests);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

router.put('/', async (req, res) => {
	try {
		const change = req.body;
		const updatedRequest = await Requests.update(change.id, change);
		res.status(200).json(updatedRequest);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const update = req.body;
	try {
		await Requests.update(id, update);
		res.status(200);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

router.delete('/', async (req, res) => {
	try {
		const { id } = req.body;
		await Requests.remove(id);
		res.status(200).json({ message: `Requests with id: ${id} succesfully deleted` });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

router.route('/:id/documents').all(validateRequestId).post(createDocument).get(getAllDocuments);

module.exports = router;
