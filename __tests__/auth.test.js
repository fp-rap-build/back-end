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

describe('POST /auth', () => {
  describe('POST /auth/register', () => {
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

      const { token, status } = res.body

      expect(token).toBeTruthy()
      expect(status).toBe('success')

      expect(firstName).toBe('test');
      expect(lastName).toBe('test');
      expect(email).toBe('testemail@gmail.com');
      expect(role).toBe('tenant')
      expect(addressId).toBeTruthy();
      expect(requestStatus).toBe('received');
      expect(isRequestingAssistance).toBe(true)
      expect(monthlyIncome).toBe(500)
    });

    const existingUser = {
      firstName: "John",
      lastName: "shelby",
      email: "tenant@gmail.com",
      password: "testpassword"
    }

    it('Responds with 400 when user already exists', async () => {
      let res = await supertest(app).post('/auth/register').send(existingUser)

      expect(res.type).toBe('application/json')
      expect(res.status).toBe(400)
      expect(res.body.message).toBe('User with that email already exists')
    })

    it('Responds with 400 when missing fields', () => {
      let res = await supertest(app).post({})

      expect(res.type).toBe('application/json')
      expect(res.status).toBe(400)
      

    })

  });
});
