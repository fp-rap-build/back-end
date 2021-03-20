const db = require('../../../data/db-config');

const findAll = async () => await db('comments');

const create = (comment) => {
  return db('comments').insert(comment).returning('*');
};

const remove = async (id) => await db('comments').where({ id }).del();

const update = (id, comment) => {
  return db('comments').where({ id }).first().update(comment).returning('*');
};


const findBy = (filter) => {
  return db('comments as c')
    .join('users as u', 'c.authorId', '=', 'u.id')
    .select('c.id', 'c.requestId', 'u.firstName', 'u.lastName', 'c.comment', 'c.createdAt')
    .where(filter)
    .orderByRaw('c.id ASC');
};

module.exports = {
  findAll,
  create,
  remove,
  update,
  findBy,
};
