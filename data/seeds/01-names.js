exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("names")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("names").insert([
        { name: "Tommy Shelby" },
        { name: "John Shelby" },
        { name: "Arthur Shelby" },
        { name: "Billy Kimber" },
      ]);
    });
};
