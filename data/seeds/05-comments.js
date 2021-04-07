const db = require('../db-config');

exports.seed = async function (knex) {
  //see requests seed file for example response from db
  const ids = await db('users').select('id');

  return knex('comments')
    .del()
    .then(function () {
      return knex('comments').insert([
        {
          requestId: 1,
          authorId: ids[0].id,
          comment:
            'Hi Billy I received your requests and have a few questions!',
          createdAt: '2021-03-20 13:00:00',
          category: 'external',
        },
        {
          requestId: 1,
          authorId: ids[2].id,
          comment: 'Great - What do you need from me?',
          createdAt: '2021-03-20 14:00:00',
          category: 'external',
        },
        {
          requestId: 1,
          authorId: ids[0].id,
          comment: 'Internal Test Comment',
          createdAt: '2021-03-20 14:00:00',
          category: 'internal',
        },
      ]);
    });
};
