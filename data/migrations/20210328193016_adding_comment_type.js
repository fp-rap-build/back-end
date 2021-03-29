exports.up = function (knex) {
  return knex.schema.table('comments', (tbl) => {
    tbl.enu('category', ['internal', 'external']).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.table('comments', (tbl) => {
    tbl.dropColumn('category');
  });
};
