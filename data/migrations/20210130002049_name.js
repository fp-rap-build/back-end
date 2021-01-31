
exports.up = function (knex) {
    return knex.schema.createTable("names", (tbl) => {
        tbl.increments()

        tbl.string("firstName", 128).notNullable();
        tbl.string("lastName", 128).notNullable();
        tbl
        .string('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("names")
};
