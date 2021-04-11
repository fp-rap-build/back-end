exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('programs')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('programs').insert([
        { id: 1, organizationId: 1, name: 'Rental Assistance' },
        { id: 2, organizationId: 2, name: 'ERA' },
        { id: 3, organizationId: 2, name: 'ERAP' },
        { id: 4, organizationId: 3, name: 'Rental Assistance' },
      ]);
    });
};
