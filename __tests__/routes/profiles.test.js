const request = require('supertest');
const express = require('express');
const Users = require('../../api/routes/users/userModel');
const userRouter = require('../../api/routes/users/userRouter');


const server = express();
server.use(express.json());

// mock the authId

// Mock the database
jest.mock('../../api/routes/users/userModel');

// Mock authRequired middleware

jest.mock('../../api/middleware/authRequired', () => {
  return jest.fn((req, res, next) => next());
});

jest.mock('../../api/middleware/restrictTo', () => {
  return jest.fn(() => (req, res, next) => next());
});

// Test users/me route
describe('User router endpoints', () => {
  beforeAll(() => {
    server.use(['/user', '/users'], userRouter);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /', () => {
    it('Should return an array of Objects containing all users data', async () => {
      Users.findAll.mockResolvedValue([mockData.buildUser(), mockData.buildUser(), mockData.buildUser()]);
      try {
        const res = await request(server).get('/users');
        expect(res.statusCode).toBe(200);
      } catch (error) {
        expect(res.statusCode).toBe(500);
      }
    });
  });

  describe('GET /me', () => {
    it('Should return a user object containing information about the user', async () => {
      // mockResolvedValue should have a value of the expected returned value
      const user = {
        id: '00u4o3bmgukEv4uzA5d6',
        email: 'admin@gmail.com',
        firstName: 'Billy',
        lastName: 'Bob',
        role: 'admin',
        isRequestingAssistance: true,
        requestStatus: 'approved',
        familySize: 0,
        monthlyIncome: null,
        addressId: 1,
        organizationId: null,
      };
      const response = { user: user };

      const res = await request(server).get('/users/me');
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /:id', () => {
    it('Should return the data of a user with the given id', async () => {
      Users.findById.mockResolvedValue({
        id: '00u4o3bmgukEv4uzA5d6',
        email: 'admin@gmail.com',
        firstName: 'Billy',
        lastName: 'Bob',
        role: 'admin',
        isRequestingAssistance: true,
        requestStatus: 'approved',
        familySize: 0,
        monthlyIncome: null,
        addressId: 1,
        organizationId: null,
      });

      const res = await request(server).get('/users/00u4o1ofebvodClCm5d6');
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /:id/address', () => {
    it('Should return the address for the user with the given id', async () => {
      Users.findAddressByUserId.mockResolvedValueOnce({
        address: {
          address: '234 E. Main St',
          state: 'WA',
          cityName: 'Spokane',
          zipCode: 12345,
        },
      });

      const res = await request(server).get(
        '/users/00u4o3bmgukEv4uzA5d6/address'
      );
      expect(res.statusCode).toBe(200);
    });
  });
});
