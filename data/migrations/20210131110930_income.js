exports.up = function (knex) {
    return knex.schema.createTable("income", (tbl) => {
        tbl.increments();

        tbl.decimal('monthlyIncome', [15,2]);
            
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
    return knex.schema.dropTableIfExists("income")
};
