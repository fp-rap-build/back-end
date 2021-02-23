const { default: expectCt } = require('helmet/dist/middlewares/expect-ct');
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

describe('Authentication routes', () => {
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

    it('Creates a new user and sends back token', async () => {
      let res = await supertest(app).post('/auth/register').send(testUser);

      expect(res.type).toBe('application/json');
      expect(res.status).toBe(201);

      // Verify response body
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

      const { token, status } = res.body;

      expect(token).toBeTruthy();

      expect(firstName).toBe('test');
      expect(lastName).toBe('test');
      expect(email).toBe('testemail@gmail.com');
      expect(role).toBe('tenant');
      expect(addressId).toBeTruthy();
      expect(requestStatus).toBe('received');
      expect(isRequestingAssistance).toBe(true);
      expect(monthlyIncome).toBe(500);
    });

    const existingUser = {
      firstName: 'John',
      lastName: 'shelby',
      email: 'tenant@gmail.com',
      password: 'testpassword',
      role: 'tenant',
      monthlyIncome: 100,
      familySize: 3,
    };

    it('Responds with 400 when user already exists', async () => {
      let res = await supertest(app).post('/auth/register').send(existingUser);

      expect(res.type).toBe('application/json');
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('User with that email already exists');
    });

    it('Responds with 422 when required are missing', async () => {
      let res = await supertest(app).post('/auth/register').send({});

      expect(res.type).toBe('application/json');
      expect(res.status).toBe(422);
      expect(res.body.errors).toBeTruthy();
    });

    it('Reponds with 422 when role is anything but landlord or tenant', async () => {
      testUser['role'] = 'admin';

      let res = await supertest(app).post('/auth/register').send(testUser);

      // Switch role back to tenant for any future tests
      testUser['role'] = 'tenant';

      expect(res.type).toBe('application/json');
      expect(res.status).toBe(422);
      expect(res.body.errors).toBeTruthy();
    });
  });

  describe('POST /auth/login', () => {
    const userCredentials = {
      email: "admin@gmail.com",
      password: "testpassword"
    }

    it('Responds with 201 when a user logs in', async () => {
      let res = await supertest(app).post('/auth/login').send(userCredentials)

      const { token } = res.body
      const { email, password } = res.body.user

      expect(res.type).toBe('application/json')
      expect(res.status).toBe(200)

      expect(token).toBeTruthy()
      expect(email).toBe('admin@gmail.com')

      // Make sure the password isn't being sent back
      expect(password).toBeFalsy()
    })

    it('Responds with 422 when required fields are missing', async () => {
      let res = await supertest(app).post('/auth/login').send({})

      expect(res.type).toBe('application/json')
      expect(res.status).toBe(422)
      expect(res.body.errors).toBeTruthy()
    })

  });
});
