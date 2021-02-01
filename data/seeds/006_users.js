exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: '00u4o3bmgukEv4uzA5d6', // changing this to 1 for some reason redirects login to tenant, this could be a security issue
          firstName: 'Billy',
          lastName: 'Bob',
          role: 'admin',
          monthlyIncome: 1500.00,
          isRequestingAssistance: false,
          familySize: 2,
          streetNumber: '123',
          streetName: 'north main',
          cityName: 'Spokane',
          state: 'Washington',
          zipCode: '12345',
          email: 'admin@gmail.com'
        },
        {
          id: '00u4o1ofebvodClCm5d6',
          firstName: 'William',
          lastName: 'Frankinwich',
          role: 'tenant',
          monthlyIncome: 800.00,
          isRequestingAssistance: true,
          familySize: 1,
          streetNumber: '456',
          streetName: 'north washington avenue',
          cityName: 'Spokane',
          state: 'Washington',
          zipCode: '12345',
          email: 'tenant@gmail.com'
        }, {
          id: '00u4o1di44exWPbUQ5d6',
          firstName: 'Joey',
          lastName: 'Smith',
          role: 'pending',
          monthlyIncome: 8000.00,
          isRequestingAssistance: true,
          familySize: 10,
          streetNumber: '789',
          streetName: 'north st',
          cityName: 'Spokane',
          state: 'Washington',
          zipCode: '12345',
          email: 'pending@gmail.com'
        },
        {
          id: '00u4o22duEeEM1UIj5d6',
          firstName: 'George',
          lastName: 'Johnson',
          role: 'landlord',
          monthlyIncome: 8000.00,
          isRequestingAssistance: false,
          familySize: 10,
          streetNumber: '789',
          streetName: 'north st',
          cityName: 'Spokane',
          state: 'Washington',
          zipCode: '12345',
          email: 'landlord@gmail.com'
        },
      ]);
    });
};
