const bcrypt = require('bcryptjs');
const db = require('../db-config')
exports.seed = function (knex) {

  db('addresses').then(rows => {
    console.log(rows)
  }).catch(err => {
    console.error(err)
  })
  
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
          isRequestingAssistance: true,
          requestStatus: 'received',
          monthlyIncome: 1100
        },
        {
          email: 'tenant@gmail.com',
          firstName: 'Billy',
          lastName: 'Kimber',
          familySize: 4,
          password: bcrypt.hashSync('testpassword', 1),
          role: 'tenant',
          addressId: 3,
          isRequestingAssistance: true,
          requestStatus: 'received',
          monthlyIncome: 400,
        },
      ]);
    });
};
