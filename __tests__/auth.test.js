const { default: expectCt } = require('helmet/dist/middlewares/expect-ct');
const supertest = require('supertest');
const app = require('../api/app'); // the express server
const db = require('../data/db-config');

beforeEach(async () => {
  await db.seed.run();
  //Seeds add 4 addresses to table
});
afterAll(async () => {
  await db.destroy();
});

describe('POST /auth/register', () => {
  describe('User is created', () => {
    const testUser = {
      firstName: 'test',
      lastName: 'test',
      email: 'testemail@gmail.com',
      password: 'testpassword',
      role: 'tenant',
      familySize: 2,
      monthlyIncome: 500,
      isRequestingAssistance: true,

    };

    it('Responds with json', async () => {
      let res = await supertest(app).post('/auth/register').send(testUser);

      expect(res.type).toBe('application/json');
      expect(res.status).toBe(200);

      // Verify user body
      const {
        firstName,
        lastName,
        email,
        role,
        monthlyIncome,
        addressId,
        requestStatus,
        isRequestingAssistance,
      } = res.body.user;

      expect(firstName).toBe('test');
      expect(lastName).toBe('test');
      expect(email).toBe('testemail@gmail.com');
      expect(role).toBe('tenant')
      expect(addressId).toBeTruthy();
      expect(requestStatus).toBe('received');
      expect(isRequestingAssistance).toBe(true)
      expect(monthlyIncome).toBe(500)
    });
  });
});
