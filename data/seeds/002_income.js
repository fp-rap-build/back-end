
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('income').del()
    .then(function () {
      // Inserts seed entries
      return knex('income').insert([
        {id: 1, monthlyIncome: ''},
      ]);
    });
};
