const createApp = require("../../../../src/server/app");
const DI_NAMES = require("../../../../src/server/dependency-injection/names");
const request = require('supertest');
const createMockLogger = require("../../../utils/mocks/mockLogger");
const mongoose = require("mongoose");
const { populateDatabase, clearDatabase } = require("../../../utils/database/changeContents");
const { DB_IDS } = require('../../../utils/database/ids');

let app;
let diContainer;
const endpoint = '/profile';

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

describe("GET /profile endpoint", () => {
    // run before each "test"
    beforeEach(async () => {
        await clearDatabase(diContainer);
        await populateDatabase(diContainer);
    });

    test("Success", async () => {
        const response = await request(app).get(endpoint).send({
            username: "username"
        });
        expect(response.statusCode).toBe(200);
    });

    test("User not in DB", async () => {
        const response = await request(app).get(endpoint).send({
            username: "missingUser"
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("GetProfile: Invalid user");
    });
});