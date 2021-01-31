
exports.up = function(knex) {
    return knex.schema.createTable("family_size", (tbl) => {

        tbl.string("id").unique().notNullable();
        tbl.integer("size").notNullable();

    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("family_size")
};
