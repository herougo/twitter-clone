const createApp = require("../../../src/server/app");
const DI_NAMES = require("../../../src/server/dependency-injection/names");
const request = require('supertest');
const mockLogger = require("../../utils/mockLogger");
const mongoose = require("mongoose");

let app;

// run once before all suites in the file
beforeAll(async () => {
    app = await createApp({
        [DI_NAMES.logger]: mockLogger
    });
});

// run once after all suites in the file
afterAll(async () => {
    await mongoose.connection.close();
});

describe("POST /login endpoint", () => {
    // run before each "test"
    beforeEach(async () => {

    });

    test("Success", async () => {
        const response = await request(app).post('/login').send({
            username: "username",
            password: "aghfhawefhawef"
        });
        expect(response.statusCode).toBe(200);
        expect("token" in response.body).toEqual(true);
    });
});