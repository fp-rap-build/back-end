exports.up = function (knex) {
    return knex.schema.table('served_analytics', (tbl) => {
        tbl.integer('families_served');
        tbl.integer('people_served');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('people_served', (tbl) => {
      tbl.dropColumn('families_served');
      tbl.dropColumn('people_served');
    });
  };
  