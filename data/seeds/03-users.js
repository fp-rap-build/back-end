const bcrypt = require('bcryptjs');

exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(function () {
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
          monthlyIncome: 1100,
        },
        {
          email: 'tenant@gmail.com',
          firstName: 'Billy',
          lastName: 'Kimber',
          familySize: 4,
          password: bcrypt.hashSync('testpassword', 1),
          role: 'tenant',
          addressId: 3,
          monthlyIncome: 400,
        },
      ]);
    });
};
