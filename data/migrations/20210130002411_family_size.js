
exports.up = function(knex) {
    return knex.schema.createTable("familySize", (tbl) => {

        tbl.string("id").unique().notNullable();
        tbl.int("Family Size").notNullable();

    });
};

exports.down = function(knex) {
  
};
