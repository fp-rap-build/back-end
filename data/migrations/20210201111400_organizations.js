exports.up = function (knex) {
  return knex.schema.createTable("organizations", (tbl) => {
    tbl.increments("id");
    tbl.string("organization");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("organizations");
};
