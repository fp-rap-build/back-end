
exports.up = function (knex) {
    return knex.schema.createTable("names", (tbl) => {
        tbl.increments()

        tbl.string("firstName", 128).notNullable();
        tbl.string("lastName", 128).notNullable();

    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("names")
};
