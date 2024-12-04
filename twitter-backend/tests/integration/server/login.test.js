const createApp = require("../../../src/server/app");
const DI_NAMES = require("../../../src/server/dependency-injection/names");
const request = require('supertest');
const createMockLogger = require("../../utils/mocks/mockLogger");
const mongoose = require("mongoose");
const { populateDatabase, clearDatabase } = require("../../utils/database/changeContents");

let app;
let diContainer;

// run once before all suites in the file
beforeAll(async () => {
    const appData = await createApp({
        [DI_NAMES.logger]: createMockLogger()
    });
    app = appData.app;
    diContainer = appData.diContainer;

    await clearDatabase(diContainer);
    await populateDatabase(diContainer);
});

// run once after all suites in the file
afterAll(async () => {
    await mongoose.connection.close(); // neccessary to avoid a jest error
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

    test("User not in DB", async () => {
        const response = await request(app).post('/login').send({
            username: "user_dne",
            password: "aghfhawefhawef"
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("User is missing");
    });

    test("Missing password", async () => {
        const response = await request(app).post('/login').send({
            username: "username"
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("A username or password is not provided");
    });

    test("Invalid password", async () => {
        const response = await request(app).post('/login').send({
            username: "username",
            password: "incorrect_password"
        });
        expect(response.statusCode).toBe(401);
        expect(response.body.errors.message).toEqual("Password is invalid");
    });
});