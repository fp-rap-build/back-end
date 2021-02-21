exports.up = function (knex) {
  return knex.schema.createTable('users', (tbl) => {
    tbl.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    tbl.string('firstName', 128).notNullable();
    tbl.string('lastName', 128).notNullable();
    tbl.string('email', 128).unique().notNullable();
    tbl.string('password', 256).notNullable();
    tbl
      .enu('role', ['pending', 'tenant', 'landlord', 'admin', 'programManager'])
      .notNullable()
      .defaultsTo('pending');
    tbl.boolean('isRequestingAssistance').defaultsTo(false);
    tbl
      .enu('requestStatus', [
        'received',
        'inReview',
        'approved',
        'denied',
        'pending',
      ])
      .defaultsTo('pending');
    tbl.integer('familySize').defaultsTo(0);
    tbl.integer('monthlyIncome').unsigned();
    tbl
      .integer('addressId')
      .unsigned()
      .references('id')
      .inTable('addresses')
      .onDelete('RESTRICT')
      .onUpdate('RESTRICT');
    tbl
      .integer('organizationId')
      .unsigned()
      .references('id')
      .inTable('organizations')
      .onDelete('RESTRICT')
      .onUpdate('RESTRICT');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
