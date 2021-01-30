exports.up = function (knex) {
    return knex.schema.createTable("address", (tbl) => {
        tbl.string("id").unique().notNullable();
        tbl.int('streetNumber');
        tbl.string('streetName', 128);
        tbl.string('cityName', 30);
        tbl.string('state', 25);
        tbl.int('zipCode');
    });
}
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("address")
};