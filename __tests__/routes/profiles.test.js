const request = require("supertest");
const express = require("express");
const Users = require("../../api/routes/users/userModel");
const userRouter = require("../../api/routes/users/userRouter");

const server = express();
server.use(express.json());

const client = new okta.Client({
	orgUrl: "https://okta-dev-79515564.okta.com",
	authorizationMode: "PrivateKey",
	clientId: "0oa4nwcyb3w5UdWlb5d6",
	scopes: ["okta.users.manage"],
	privateKey: "{00WzfwJ9bDJJ41AuFZF8D5gJtwXaFL1CpBoR3co8WJ}", // <-- see notes below
});

// Mock authRequired middleware
jest.mock("../../api/middleware/authRequired.js", () => {
	jest.fn((req, res, next) => next());
});

jest.mock("../../api/routes/users/userModel.js", () => {
	jest.fn((req, res, next) => next());
});

// Test users/me route
describe("server.js", () => {
        let res = {};
        beforeAll(async () => {
            res = await request(userRouter).get("/me");
        })
      it("Should return 200 ok", async () => {
        // const res = await request(server).get("/");
        expect(res.status).toBe(200);
      });
});
