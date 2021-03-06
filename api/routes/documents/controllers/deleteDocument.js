const aws = require('../../../../config/aws');
const s3 = new aws.S3();

const Documents = require('../documentModel');

const deleteDocument = async (req, res) => {
	const { id } = req.params;

	let params = { Bucket: process.env.AWS_BUCKET_NAME, Key: id };

	try {
		// Delete document from AWS
		await s3.deleteObject(params).promise();

		// Now let's remove it from our db
		await Documents.findByIdAndDelete(id);

		res.status(200).json({ message: 'Document has been deleted', documentId: id });
	} catch (error) {
		console.log(error);
		res.status(400).json({ error });
	}
};

module.exports = deleteDocument;
