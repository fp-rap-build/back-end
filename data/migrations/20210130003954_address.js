exports.up = function (knex) {
    return knex.schema.createTable("address", (tbl) => {
        tbl.increments()
        tbl.integer('streetNumber');
        tbl.string('streetName', 128);
        tbl.string('cityName', 30);
        tbl.string('state', 25);
        tbl.integer('zipCode');
        
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
    return knex.schema.dropTableIfExists("address")
};