exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1, 
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
        },
        {
          id: 2, 
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
        },        {
          id: 3, 
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
        },
        {
          id: 4, 
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
        },
      ]);
    });
};
