
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('served_analytics').del()
    .then(function () {
      // Inserts seed entries
      return knex('served_analytics').insert([
        {id: 1, families_served: 0, people_served: 0}
      ]);
    });
};
