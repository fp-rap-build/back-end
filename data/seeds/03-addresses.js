exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("addresses")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("addresses").insert([
        {
          streetNumber: 904,
          streetName: "E. Hartson Ave",
          cityName: "Spokane",
          state: "WA",
          zipCode: 99202,
        },
        {
          streetNumber: 904,
          streetName: "E. Hartson Ave",
          cityName: "Spokane",
          state: "WA",
          zipCode: 99202,
        },
        {
          streetNumber: 904,
          streetName: "E. Hartson Ave",
          cityName: "Spokane",
          state: "WA",
          zipCode: 99202,
        },
      ]);
    });
};
