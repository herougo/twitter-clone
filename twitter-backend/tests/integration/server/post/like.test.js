const createApp = require("../../../../src/server/createApp");
const DI_NAMES = require("../../../../src/server/dependency-injection/names");
const request = require('supertest');
const createMockLogger = require("../../../utils/mocks/mockLogger");
const mongoose = require("mongoose");
const { populateDatabase, clearDatabase } = require("../../../utils/database/changeContents");
const { DB_IDS } = require("../../../utils/database/ids");
const { USER_JWT_TOKENS } = require("../../../utils/database/userData");

let app;
let diContainer;
const endPointSuffix = 'like';
const otherEndPointSuffix = 'dislike';

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

describe("POST /post/:postId/like endpoint", () => {
    // run before each "test"
    beforeEach(async () => {
        await clearDatabase(diContainer);
        await populateDatabase(diContainer);
    });

    const sendToEndpoint = async (endpointSuffix, postId, token) => {
        const endpoint = `/post/${postId}/${endpointSuffix}`;
        if (!token) {
            return await request(app)
                .post(endpoint)
                .send();
        }

        return await request(app)
            .post(endpoint)
            .set('Authorization', `Bearer ${token}`)
            .send();
    };

    test("Success (no previous engagement)", async () => {
        const response = await sendToEndpoint(
            endPointSuffix,
            DB_IDS.mainPost,
            USER_JWT_TOKENS.main
        );
        expect(response.statusCode).toBe(200);
    });

    test("Success (previous engagement)", async () => {
        const response = await sendToEndpoint(
            otherEndPointSuffix,
            DB_IDS.mainPost,
            USER_JWT_TOKENS.main
        );
        expect(response.statusCode).toBe(200);
        const response2 = await sendToEndpoint(
            endPointSuffix,
            DB_IDS.mainPost,
            USER_JWT_TOKENS.main
        );
        expect(response2.statusCode).toBe(200);
        // TODO: check database for notifications and correct like/dislike data
    });

    test("Invalid User", async () => {
        const response = await sendToEndpoint(
            endPointSuffix,
            DB_IDS.mainPost,
            USER_JWT_TOKENS.missing
        );
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("Invalid userFromId");
    });

    test("Already liked", async () => {
        const response = await sendToEndpoint(
            endPointSuffix,
            DB_IDS.mainPost,
            USER_JWT_TOKENS.main
        );
        expect(response.statusCode).toBe(200);
        const response2 = await sendToEndpoint(
            endPointSuffix,
            DB_IDS.mainPost,
            USER_JWT_TOKENS.main
        );
        expect(response2.statusCode).toBe(400);
        expect(response2.body.errors.message).toEqual("Tried to like a post which is already liked.");
    });

    test("No JWT token", async () => {
        const response = await sendToEndpoint(
            endPointSuffix,
            DB_IDS.mainPost,
        );
        expect(response.statusCode).toBe(401);
    });
});