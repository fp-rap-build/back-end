const bcrypt = require('bcryptjs');

exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          email: 'admin@gmail.com',
          firstName: 'Tommy',
          lastName: 'Shelby',
          password: bcrypt.hashSync('testpassword', 1),
          role: 'admin',
          addressId: 1,
        },
        {
          email: 'landlord@gmail.com',
          firstName: 'John',
          lastName: 'Shelby',
          password: bcrypt.hashSync('testpassword', 1),
          role: 'landlord',
          familySize: 3,
          addressId: 2,
          // isRequestingAssistance: true,
          // requestStatus: 'received',
          monthlyIncome: 1100,
        },
      ]);
    });
};
