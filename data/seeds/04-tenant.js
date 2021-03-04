const db = require('../db-config');
const bcrypt = require('bcryptjs');

exports.seed = async function (knex) {
  //see requests seed file for example response from db
  const ids = await db('users').select('id');

  return knex('users').insert([
    {
      email: 'tenant@gmail.com',
      firstName: 'Billy',
      lastName: 'Kimber',
      familySize: 4,
      password: bcrypt.hashSync('testpassword', 1),
      role: 'tenant',
      addressId: 3,
      // isRequestingAssistance: true,
      // requestStatus: 'received',
      monthlyIncome: 400,
      progMgrId: ids[0].id,
    },
  ]);
};
