const db = require('../../../data/db-config')

const findAll = () => db('programs')

const create = (program) => db('programs').insert(program).returning('*')

module.exports = {
    findAll,
    create
}