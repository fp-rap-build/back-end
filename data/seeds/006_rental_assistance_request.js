
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('rental_assistance_request').del()
    .then(function () {
      // Inserts seed entries
      return knex('rental_assistance_request').insert([
        {id: 1, isRequestingAssistance: 'true', requestStatus: ''},
      ]);
    });
};
