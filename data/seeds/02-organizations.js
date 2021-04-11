exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('organizations')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('organizations').insert([
        { organization: 'Family Promise of Spokane' },
        { organization: 'Spokane Neighborhood Action Partners (SNAP)' },
        { organization: 'Catholic Charities' },
      ]);
    });
};
