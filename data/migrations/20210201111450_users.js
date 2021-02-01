exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.string("id").unique().notNullable();
    tbl.string("email", 128).unique().notNullable();
    tbl.string("firstName", 128).notNullable();
    tbl.string("lastName", 128).notNullable();
    tbl
      .enu("role", ["pending", "tenant", "landlord", "admin"])
      .notNullable()
      .defaultsTo("pending");
    tbl.boolean("is_requesting_assistance").defaultsTo(0);
    tbl
      .enu("request_status", ["pending", "approved", "denied"])
      .defaultsTo("pending");
    tbl.integer("family_size").defaultsTo(0);
    tbl
      .integer("income_id")
      .unsigned()
      .references("id")
      .inTable("income_monthly")
      .onDelete("RESTRICT")
      .onUpdate("RESTRICT");
    tbl
      .integer("address_id")
      .unsigned()
      .references("id")
      .inTable("addresses")
      .onDelete("RESTRICT")
      .onUpdate("RESTRICT");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
