
const bcrypt = require('bcryptjs')

exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          
          email: "admin@gmail.com",
          firstName: "Tommy",
          lastName: "Shelby",
          password: bcrypt.hashSync('testpassword', 12),
          role: "admin",
          addressId: 1
        },
        {

          email: "landlord@gmail.com",
          firstName: "John",
          lastName: "Shelby",
          password: bcrypt.hashSync('testpassword', 12),
          role: "landlord",
          organizationId: 1,
          addressId: 2,
          isRequestingAssistance: true,
          requestStatus: 'received'
        },
        {

          email: "tenant@gmail.com",
          firstName: "John",
          lastName: "Shelby",
          password: bcrypt.hashSync('testpassword', 12),
          role: "tenant",
          addressId: 3,
          isRequestingAssistance: true,
          requestStatus: 'received'
        },
        {

          email: "pending@gmail.com",
          firstName: "Billy",
          lastName: "Kimber",
          password: bcrypt.hashSync('testpassword', 12),
          addressId: 4
        },
      ]);
    });
};
