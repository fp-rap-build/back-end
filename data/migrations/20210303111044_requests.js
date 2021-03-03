exports.up = function (knex) {
  return knex.schema.createTable('requests', (tbl) => {
    tbl.increments('id');
    tbl.uuid('requesterId').notNullable().references('id').inTable('users');
    tbl.uuid('managerId').notNullable().references('id').inTable('users');
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
