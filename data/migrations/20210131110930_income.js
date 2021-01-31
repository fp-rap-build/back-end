exports.up = function (knex) {
    return knex.schema.createTable("income", (tbl) => {
        tbl.increments()

        tbl.decimal('monthlyIncome', [15,2])
            
    });
}
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("income")
};
