const createApp = require("../../../../src/server/createApp");
const DI_NAMES = require("../../../../src/server/dependency-injection/names");
const request = require('supertest');
const createMockLogger = require("../../../utils/mocks/mockLogger");
const mongoose = require("mongoose");
const { populateDatabase, clearDatabase } = require("../../../utils/database/changeContents");
const { DB_IDS } = require("../../../utils/database/ids");
const { sanitizePaths } = require("../../../utils/sanitization");
const { USER_JWT_TOKENS } = require("../../../utils/database/userData");

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

describe("GET /user/name/:username/post endpoint", () => {
    // run before each "test"
    beforeEach(async () => {
        await clearDatabase(diContainer);
        await populateDatabase(diContainer);
    });

    const sendToEndpoint = async (param, token) => {
        const fullEndpoint = `/user/name/${param}/post`;
        if (!token) {
            return await request(app)
                .get(fullEndpoint)
                .send();
        }

        return await request(app)
            .get(fullEndpoint)
            .set('Authorization', `Bearer ${token}`)
            .send();
    };

    test("Success", async () => {
        const response = await sendToEndpoint('username', USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(200);
        const sanitizedBody = response.body.map(
            post => sanitizePaths(post, ['createdDate', 'replyTo.createdDate'], '')
        );
        expect(sanitizedBody).toMatchSnapshot();
    });

    test("Success (follower)", async () => {
        const response = await sendToEndpoint('follower', USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(200);
        const sanitizedBody = response.body.map(
            post => sanitizePaths(post, ['createdDate', 'replyTo.createdDate'], '')
        );
        expect(sanitizedBody).toMatchSnapshot();
    });

    test("Invalid User", async () => {
        const response = await sendToEndpoint('missingUser', USER_JWT_TOKENS.missing);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("GetPosts: Invalid user");
    });

    test("No JWT token", async () => {
        const response = await sendToEndpoint('username');
        expect(response.statusCode).toBe(401);
    });
});