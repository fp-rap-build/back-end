exports.up = function (knex) {
  return knex.schema.table('comments', (tbl) => {
    tbl.enu('type', ['internal', 'external']).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.table('comments', (tbl) => {
    tbl.dropColumn('type');
  });
};
