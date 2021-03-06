const db = require('../../../data/db-config')

const findAll = () => db('documents')

const findById = (id) => db('documents').where({ id })

const findByIdAndDelete = (id) => db('documents').where({ id }).del();

module.exports = {
    findAll,
    findById,
	findByIdAndDelete
};
