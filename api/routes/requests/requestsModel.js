const db = require('../../../data/db-config');

const findAll = async () => await db('requests');

const create = (request) => {
  return db('requests').insert(request).returning('*');
};

const remove = async (id) => await db('requests').where({ id }).del();

const update = (id, request) => {
  return db('requests').where({ id }).first().update(request).returning('*');
};



module.exports = {
  findAll,
  create,
  remove,
  update,
};
