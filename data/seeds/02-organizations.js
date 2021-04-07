exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('organizations')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('organizations').insert([
        { organization: 'Family Promise of Spokane' },
        { organization: 'Family Promise of Clark County' },
        { organization: 'Family Promise of Cowlitz County' },
      ]);
    });
};
