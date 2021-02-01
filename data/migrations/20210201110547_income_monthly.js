exports.up = function (knex) {
  return knex.schema.createTable("income_monthly", (tbl) => {
    tbl.increments("id");
    tbl.decimal("income", [15, 2]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("income_monthly");
};
