const request = require('supertest');
const express = require('express');
const Users = require('../../api/routes/users/userModel');
const userRouter = require('../../api/routes/users/userRouter');
const mockAuthRequired = require('../../mock/mockAuthRequired')

const server = express();
server.use(express.json());

// mock the authId 

// Mock the database
jest.mock('../../api/routes/users/userModel');

// Mock authRequired middleware

jest.mock('../../api/middleware/authRequired', () => {
  return jest.fn((req,res,next) => next());
});


// Test users/me route
describe('User router endpoints', () => {
  beforeAll(() => {
    server.use(['/user', '/users'], userRouter);
  });
  beforeEach(() => {
    jest.clearAllMocks();
  })

  describe('GET /me', () => {
    it('Should return 200', async () => {
      Users.findByIdAndUpdate.mockResolvedValue([]);

      const res = await request(server).get('/me');

      expect(res.status).toBe(200);
    });
  });
});
