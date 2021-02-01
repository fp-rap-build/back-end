
exports.up = function (knex) {
    return knex.schema.createTable("users", (tbl) => {
        tbl.string("id").unique().notNullable();

        tbl.string("email", 128).unique().notNullable();

        tbl.string("firstName", 128).notNullable();
        tbl.string("lastName", 128).notNullable();

        tbl.integer("familySize").notNullable();

        tbl.integer('streetNumber');
        tbl.string('streetName', 128);
        tbl.string('cityName', 30);
        tbl.string('state', 25);
        tbl.integer('zipCode')


        tbl
            .boolean("isRequestingAssistance")
            .nullable();
        tbl
            .enu("assistance_request_status", ["pending", "approved", "denied"])
            .notNullable()
            .defaultsTo("pending")

        tbl
            .enu("role", ["pending", "tenant", "landlord", "admin"])
            .notNullable()
            .defaultsTo("admin")
        tbl.decimal('monthlyIncome', [15,2])
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("users")
};