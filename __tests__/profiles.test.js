const express = require('express');

const server = express();
server.use(express.json());

//Sanity Check
describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })
})

// Mock authRequired middleware
// jest.mock('../../api/middleware/authRequired.js', () => {
//   jest.fn((req, res, next) => next());
// });

// jest.mock('../../api/routes/users/userModel.js', () => {
//   jest.fn((req, res, next) => next());
// });

// Test users/me route
// describe('server.js', () => {
//   let res = {};
//   beforeAll(async () => {
//     res = await request(userRouter).get('/me');
//     console.log(res);
//   });
//   it('Should return 200 ok', async () => {
//     // const res = await request(server).get("/");
//     expect(res.status).toBe(200);
//   });
// });
