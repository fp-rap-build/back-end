const Requests = require('../../requests/requestsModel');

const validateRequestId = async (req, res, next) => {
	const { id } = req.params;

	try {
		const request = await Requests.findBy({ id });

		if (request.length === 0) {
			return res.status(404).json({ message: `Request with id of ${id} does not exist` });
		}

		next();
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};

module.exports = { validateRequestId };
