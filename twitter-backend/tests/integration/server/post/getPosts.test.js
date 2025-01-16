const createApp = require("../../../../src/server/app");
const DI_NAMES = require("../../../../src/server/dependency-injection/names");
const request = require('supertest');
const createMockLogger = require("../../../utils/mocks/mockLogger");
const mongoose = require("mongoose");
const { populateDatabase, clearDatabase } = require("../../../utils/database/changeContents");
const { DB_IDS } = require("../../../utils/database/ids");
const { sanitizePaths } = require("../../../utils/sanitization");

let app;
let diContainer;

// run once before all suites in the file
beforeAll(async () => {
    const appData = await createApp({
        [DI_NAMES.logger]: createMockLogger()
    });
    app = appData.app;
    diContainer = appData.diContainer;
});

// run once after all suites in the file
afterAll(async () => {
    await mongoose.connection.close(); // neccessary to avoid a jest error
});

describe("GET /post/byUsername/:username endpoint", () => {
    // run before each "test"
    beforeEach(async () => {
        await clearDatabase(diContainer);
        await populateDatabase(diContainer);
    });

    test("Success", async () => {
        const response = await request(app).get('/post/byUsername/username').send();
        expect(response.statusCode).toBe(200);
        const sanitizedBody = response.body.map(
            post => sanitizePaths(post, ['createdDate', 'replyTo.createdDate'], '')
        );
        expect(sanitizedBody).toMatchSnapshot();
    });

    test("Success (follower)", async () => {
        const response = await request(app).get('/post/byUsername/follower').send();
        expect(response.statusCode).toBe(200);
        const sanitizedBody = response.body.map(
            post => sanitizePaths(post, ['createdDate', 'replyTo.createdDate'], '')
        );
        expect(sanitizedBody).toMatchSnapshot();
    });

    test("Invalid User", async () => {
        const response = await request(app).get('/post/byUsername/missingUser').send();
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("GetPosts: Invalid user");
    });

    test("Missing User", async () => {
        const response = await request(app).get('/post/byUsername/').send();
        expect(response.statusCode).toBe(500);
    });
});