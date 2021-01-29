
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('family_size').del()
    .then(function () {
      // Inserts seed entries
      return knex('family_size').insert([
        {id: 1, familySize: 3},
      ]);
    });
};
