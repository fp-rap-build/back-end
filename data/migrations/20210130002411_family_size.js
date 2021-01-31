
exports.up = function(knex) {
    return knex.schema.createTable("family_size", (tbl) => {
        tbl.increments()

        tbl.integer("size").notNullable();
        
        tbl
        .string('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("family_size")
};
