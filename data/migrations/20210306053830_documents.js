exports.up = function(knex) {
	return knex.schema.createTable('documents', (tbl) => {
		tbl.string('id').notNullable().primary();
		tbl.integer('requestId').notNullable().references('id').inTable('requests');
		tbl.string('name')
		tbl.string('type')
		tbl.string('location').notNullable();
		tbl.timestamp('createdAt').defaultTo(knex.fn.now());
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('documents');
};
