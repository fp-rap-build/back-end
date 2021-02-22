const supertest = require('supertest');
const app = require('../api/app'); // the express server
const db = require('../data/db-config');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
  //Seeds add 4 addresses to table
});
afterAll(async () => {
  await db.destroy();
});

describe('Auth endpoints', () => {
  test('User can register', async () => {
    let res = await supertest(app)
      .post('/auth/register')
      .send({
        firstName: 'test',
        lastName: 'test',
        email: 'testemail@gmail.com',
        password: 'testpassword',
      });
    console.log(res.status)
  });
});
