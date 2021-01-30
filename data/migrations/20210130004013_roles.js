exports.up = function (knex) {
    return knex.schema.createTable("user_roles", (tbl) => {
        tbl.string("id").unique().notNullable();

        tbl
            .enu("role", ["pending", "tenant", "landlord", "admin"])
            .notNullable()
            .defaultsTo("pending");
    });
}
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("user_roles")
};
