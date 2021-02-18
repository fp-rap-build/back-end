
exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: "00u6o99rzitBrnIbh5d6",
          email: "admin@gmail.com",
          firstName: "Tommy",
          lastName: "Shelby",
          role: "admin",
          addressId: 1
        },
        {
          id: "00u6o9m4nldTtQcse5d6",
          email: "landlord@gmail.com",
          firstName: "John",
          lastName: "Shelby",
          role: "landlord",
          organizationId: 1,
          addressId: 2,
          isRequestingAssistance: true,
          requestStatus: 'received'
        },
        {
          id: "00u6ob0dwGi2PNgYe5d6",
          email: "tenant@gmail.com",
          firstName: "Johnny",
          lastName: "Silverhand",
          role: "tenant",
          addressId: 3,
          isRequestingAssistance: true,
          requestStatus: 'received'
        },
        {
          id: "00u6ob1znZhxryhRU5d6",
          email: "pending@gmail.com",
          firstName: "Billy",
          lastName: "Kimber",
          addressId: 4
        },
      ]);
    });
};
