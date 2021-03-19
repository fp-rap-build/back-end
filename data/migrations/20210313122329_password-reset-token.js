exports.up = function (knex) {
  return knex.schema.table('users', (tbl) => {
    tbl.date('passwordChangedAt');
    tbl.string('passwordResetToken');
    tbl.string('passwordResetExpires');
  });
};

exports.down = function (knex) {
  return knex.schema.table('users', (tbl) => {
    tbl.dropColumn('passwordChangedAt');
    tbl.dropColumn('passwordResetToken');
    tbl.dropColumn('passwordResetExpires');
  });
};
