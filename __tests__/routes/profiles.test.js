const request = require('supertest');
const express = require('express');
const Users = require('../../api/routes/users/userModel');
const userRouter = require('../../api/routes/users/userRouter');

const app = require('../../api/app');
const supertest = require('supertest');

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

// Test users/me route
describe('User router endpoints', () => {
  describe('GET /', () => {
    it('Should return an array of Objects containing all users data', async () => {
      try {
        const res = await supertest(server).get('/users');
        expect(res.statusCode).toBe(200);
      } catch (error) {
        console.log('This doesnt work');
      }
    });
  });

  describe('GET /me', () => {
    it('Should return a user object containing information about the user', async () => {
      // mockResolvedValue should have a value of the expected returned value
      const response = { user: user };

      const res = await supertest(app).get('/users/me');
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /:id', () => {
    it('Should return the data of a user with the given id', async () => {
      const res = await supertest(user).get('/users/wefwefwefw');
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /:id/address', () => {
    it('Should return the address for the user with the given id', async () => {

      const res = await supertest(app).get(
        '/users/00u4o3bmgukEv4uzA5d6/address'
      );
      expect(res.statusCode).toBe(200);
    });
  });
});
