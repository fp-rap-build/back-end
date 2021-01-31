
exports.up = function (knex) {
    return knex.schema.createTable("rental_assistance", (tbl) => {
        tbl.increments()

        tbl
            .boolean("isRequestingAssistance")
            .nullable();
        tbl
            .enu("status", ["pending", "approved", "denied"])
            .notNullable()
            .defaultsTo("pending");

        tbl
        .string('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("rental_assistance")
};
