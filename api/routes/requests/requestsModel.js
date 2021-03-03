const db = require('../../../data/db-config');

const findAll = async () => 
  await db('requests as r')


module.exports = {
  findAll
}
