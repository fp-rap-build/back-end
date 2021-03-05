const db = require('../db-config');

exports.seed = async function(knex) {

  //see requests seed file for example response from db
  const ids = await db('users').select('id');

  return knex('comments').del()
    .then(function () {
      return knex('comments').insert([
        {
          requestId: 1, 
          authorId: ids[0].id, 
          comment: "Test comment for seeds. Looks Good!"
        }
      ]);
    });
};
