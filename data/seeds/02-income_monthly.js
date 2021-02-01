exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("income_monthly")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("income_monthly").insert([
        { income: 1500.0 },
        { income: 2000.0 },
        { income: 3000.0 },
      ]);
    });
};
