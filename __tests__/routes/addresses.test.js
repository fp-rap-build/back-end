const request = require('supertest');
const server = require('../../api/app');
const db = require('../../data/db-config');

//Organize DB

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db('addresses').truncate;
});
afterAll(async () => {
  await db.destroy();
});

describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true);
  });
});
