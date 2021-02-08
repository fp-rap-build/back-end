exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.string("id").unique().notNullable();
    tbl.string("email", 128).unique().notNullable();
    tbl.string("firstName", 128).notNullable();
    tbl.string("lastName", 128).notNullable();
    tbl
      .enu("role", [
        "pending",
        "tenant",
        "landlord",
        "admin",
        "account manager",
      ])
      .notNullable()
      .defaultsTo("pending");
    tbl.boolean("is_requesting_assistance").defaultsTo(false);
    tbl
      .enu("request_status", ["received", "in_review", "approved", "denied"])
      .defaultsTo("received");
    tbl.integer("family_size").defaultsTo(0);
    tbl
      .integer("monthly_income")
      .unsigned()
    tbl
      .integer("address_id")
      .unsigned()
      .references("id")
      .inTable("addresses")
      .onDelete("RESTRICT")
      .onUpdate("RESTRICT");
    tbl
      .integer("organization_id")
      .unsigned()
      .references("id")
      .inTable("organizations")
      .onDelete("RESTRICT")
      .onUpdate("RESTRICT");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
