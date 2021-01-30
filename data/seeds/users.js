exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(() =>
      // Inserts seed entries
      knex("users").insert([
        {
          id: "00u4o3bmgukEv4uzA5d6",
          email: "admin@gmail.com",
          firstName: "Tommy",
          lastName: "Shelby",
          role: "admin",
        },
        {
          id: "00u4o1ofebvodClCm5d6",
          email: "landlord@gmail.com",
          firstName: "John",
          lastName: "Shelby",
          role: "landlord",
        },
        {
          id: "00u4o1di44exWPbUQ5d6",
          email: "tenant@gmail.com",
          firstName: "Arthur",
          lastName: "Shelby",
          role: "tenant",
        },
        {
          id: "00u4o22duEeEM1UIj5d6",
          email: "pending@gmail.com",
          firstName: "Billy",
          lastName: "Kimber",
          role: "pending"
        }
      ])
    );
};