const db = require('../../../data/db-config');

const findAll = async () => await db('comments');

const create = (comment) => {
  return db('comments').insert(comment).returning('*');
};

const remove = async (id) => await db('comments').where({ id }).del();

const update = (id, comment) => {
  return db('comments').where({ id }).first().update(comment).returning('*');
};

module.exports = {
  findAll,
  create,
  remove,
  update,
};
