
exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: "00u4o3bmgukEv4uzA5d6",
          email: "admin@gmail.com",
          firstName: "Tommy",
          lastName: "Shelby",
          role: "admin",
          addressId: 1
        },
        {
          id: "00u4o1ofebvodClCm5d6",
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
          id: "00u4o1di44exWPbUQ5d6",
          email: "tenant@gmail.com",
          firstName: "John",
          lastName: "Shelby",
          role: "tenant",
          addressId: 3,
          isRequestingAssistance: true,
          requestStatus: 'received'
        },
        {
          id: "00u4o22duEeEM1UIj5d6",
          email: "pending@gmail.com",
          firstName: "Billy",
          lastName: "Kimber",
          addressId: 4
        },
      ]);
    });
};
