const db = require('../../../data/db-config')

const findAll = () => db('programs')

module.exports = {
    findAll
}