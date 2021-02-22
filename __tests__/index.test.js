const request = require('supertest');
const db = require('../data/db-config.js');
// Full app so we can test the 404
const server = require('../api/app.js');

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6IkNocmlzMTIiLCJpYXQiOjE2MDA0NDUyODEsImV4cCI6MTYwMDQ0ODg4MX0.DyCDVZ0y5uo5RdV_2rdT8klEI4IRMHKa55KbjxIz4Fw';

describe('index router endpoints', () => {
  describe('GET /', () => {
    it('should return json with api:up', async () => {
      const res = await request(server).get('/');

      expect(res.status).toBe(200);
      expect(res.body.api).toBe('up');
    });

    it('should return 404 for /ping', async () => {
      jest.spyOn(global.console, 'error').mockImplementation(() => {});
      const res = await request(server).get('/ping');

      expect(res.status).toBe(404);
    });
  });
});
