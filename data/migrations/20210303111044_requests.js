exports.up = function (knex) {
  return knex.schema.createTable('requests', (tbl) => {
    tbl.increments('id');
    tbl.uuid('tenantId').references('id').inTable('users');
    tbl.uuid('landlordId').references('id').inTable('users');
    tbl
      .enu('requestStatus', [
        'received',
        'inReview',
        'pending',
        'approved',
        'denied',
      ])
      .notNullable()
      .defaultsTo('received');
    tbl.date('requestDate').defaultsTo(knex.raw('current_date'));
    tbl.integer('orgId').references('id').inTable('organizations');
    tbl.boolean('apmApproval').defaultsTo(false);
    tbl.boolean('pmApproval').defaultsTo(false);
    tbl.boolean('bookKeeperApproval').defaultsTo(false);
    tbl.boolean('headAcctApproval').defaultsTo(false);
    tbl.boolean('adminApproval').defaultsTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('requests');
};
