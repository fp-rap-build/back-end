/* eslint-disable no-debugger, no-console */
exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.string("id").unique().notNullable();

    tbl.string("email", 128).unique().notNullable();

    tbl.string("firstName", 128)

    tbl.string("lastName", 128)

    tbl
      .enu("role", ["pending", "tenant", "landlord", "admin"])
      .notNullable()
      .defaultsTo("pending");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
