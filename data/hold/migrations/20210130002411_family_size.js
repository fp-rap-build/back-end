
exports.up = function(knex) {
    return knex.schema.createTable("family_size", (tbl) => {
        tbl.increments()

        tbl.integer("size").notNullable();

    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("family_size")
};
