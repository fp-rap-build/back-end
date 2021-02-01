const { v4: uuidv4 } = require("uuid");

exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: uuidv4(),
          email: "admin@gmail.com",
          name_id: 1,
          role: "admin",
          income_id: 1,
          address_id: 1,
        },
        {
          id: uuidv4(),
          email: "landlord@gmail.com",
          name_id: 2,
          role: "landlord",
          income_id: 2,
          address_id: 1,
        },
        {
          id: uuidv4(),
          email: "tenant@gmail.com",
          name_id: 3,
          role: "tenant",
          family_size: 5,
          income_id: 3,
          address_id: 1,
        },
        {
          id: uuidv4(),
          email: "pending@gmail.com",
          name_id: 4,
          role: "pending",
          family_size: 3,
          income_id: 1,
          address_id: 1,
        },
      ]);
    });
};
