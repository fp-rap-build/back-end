const db = require('../../../data/db-config');

const save = (document) => db('documents').insert(document).returning('*');

const findAll = () => db('documents');

module.exports = {
    save,
    findAll
}