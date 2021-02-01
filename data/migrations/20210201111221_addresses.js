exports.up = function (knex) {
  return knex.schema.createTable("addresses", (tbl) => {
    tbl.increments("id");
    tbl.integer("streetNumber");
    tbl.string("streetName", 128);
    tbl.string("cityName", 30);
    tbl.string("state", 25);
    tbl.integer("zipCode");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("addresses");
};
