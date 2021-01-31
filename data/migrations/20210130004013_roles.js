exports.up = function (knex) {
    return knex.schema.createTable("user_roles", (tbl) => {
        tbl.increments()

        tbl
            .enu("role", ["pending", "tenant", "landlord", "admin"])
            .notNullable()
            .defaultsTo("pending");

        tbl
        .string('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
}
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("user_roles")
};
