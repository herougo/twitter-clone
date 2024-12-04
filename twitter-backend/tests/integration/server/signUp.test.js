const createApp = require("../../../src/server/app");
const DI_NAMES = require("../../../src/server/dependency-injection/names");
const request = require('supertest');
const mockLogger = require("../../utils/mocks/mockLogger");
const mongoose = require("mongoose");
const CONFIG = require("../../../src/config");
const { clearDatabase, populateDatabase } = require("../../utils/database/changeContents");

let app;
let diContainer;

beforeAll(async () => {
    const appData = await createApp({
        [DI_NAMES.logger]: mockLogger
    });
    app = appData.app;
    diContainer = appData.diContainer;
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("POST /signup endpoint", () => {
    beforeEach(async () => {
        await clearDatabase(diContainer);
        await populateDatabase(diContainer);
    });

    test("Success", async () => {
        const response = await request(app).post('/signup').send({
            user : {
                username: "username2",
                password: "alfhfufunc",
                firstName: "hello",
                lastName: "you",
                email: "hello@gmail.com"
            }
        });
        expect(response.statusCode).toBe(201);
    });

    test("Missing data", async () => {
        const response = await request(app).post('/signup').send({
            user: {
                username: "username",
                password: "aghfhawefhawef"
            }
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("Validation failed for user");
    });

    test("Invalid email", async () => {
        const response = await request(app).post('/signup').send({
            user : {
                username: "username",
                password: "aghfhawefhawef",
                firstName: "hi",
                lastName: "there",
                email: "example.com"
            }
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("Validation failed for user");
    });

    test("Duplicate username", async () => {
        const response = await request(app).post('/signup').send({
            user : {
                username: "username",
                password: "aghfhawefhawef",
                firstName: "hi",
                lastName: "there",
                email: "example@example.com"
            }
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("This user exists already");
    });
});