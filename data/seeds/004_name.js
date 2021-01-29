
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('name').del()
    .then(function () {
      // Inserts seed entries
      return knex('name').insert([
        {id: 1, firstName: '', lastName: '', middleInitial: '', suffix: ''},
      ]);
    });
};
