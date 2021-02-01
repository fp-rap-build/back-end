
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
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("rental_assistance")
};
