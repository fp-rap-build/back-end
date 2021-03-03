exports.up = function (knex) {
  return knex.schema.createTable('comments', (tbl) => {
    tbl.increments('id');
    tbl.integer('request_id').references('id').inTable('requests');
    tbl.uuid('author_id').references('id').inTable('users');
    tbl.text('comment').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('comments');
};
