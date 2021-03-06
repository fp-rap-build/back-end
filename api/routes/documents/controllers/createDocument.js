const upload = require('../utils');
const singleUpload = upload.single('image');
const Documents = require('../documentModel');

const createDocument = async (req, res) => {
	singleUpload(req, res, async (err) => {
		if (err) {
			return res.json({
				success: false,
				errors: {
					title: 'Image Upload Error',
					detail: err.message,
					error: err
				}
			});
		}
		// Document was successfully saved to the S3 bucket, let's store a reference to that document in our db

		let documentData = {
			requestId: req.params.id,
			key: req.file.key,
			location: req.file.location
		};

		try {
			let document = await Documents.save(documentData);

			res.status(201).json({
				document: document[0]
			});
            
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Unable to submit document to database' });
		}
	});
};

module.exports = createDocument;
