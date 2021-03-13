exports.up = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.boolean('verifiedDocuments');
  });
};

exports.down = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.dropColumn('verifiedDocuments');
  });
};
