const createApp = require("../../../../src/server/app");
const DI_NAMES = require("../../../../src/server/dependency-injection/names");
const request = require('supertest');
const createMockLogger = require("../../../utils/mocks/mockLogger");
const mongoose = require("mongoose");
const { populateDatabase, clearDatabase } = require("../../../utils/database/changeContents");
const { DB_IDS } = require("../../../utils/database/ids");
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

describe("DELETE /post/:postId/dislike endpoint", () => {
    // run before each "test"
    beforeEach(async () => {
        await clearDatabase(diContainer);
        await populateDatabase(diContainer);
    });

    const sendToEndpoint = async (create, postId, token) => {
        const endpoint = `/post/${postId}/dislike`;
        let result = request(app);

        if (create) {
            result = result.post(endpoint);
        } else {
            result = result.delete(endpoint);
        }

        if (token) {
            result = result.set('Authorization', `Bearer ${token}`);
        }

        return await result.send();
    };

    test("Success", async () => {
        const response = await sendToEndpoint(
            true,
            DB_IDS.mainPost,
            USER_JWT_TOKENS.main
        );
        expect(response.statusCode).toBe(200);
        const response2 = await sendToEndpoint(
            false,
            DB_IDS.mainPost,
            USER_JWT_TOKENS.main
        );
        expect(response2.statusCode).toBe(200);
        // TODO: check database for notifications and correct like/dislike data
    });

    test("No engagement", async () => {
        const response = await sendToEndpoint(
            false,
            DB_IDS.mainPost,
            USER_JWT_TOKENS.main
        );
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("Tried to dislike a post which is not disliked.");
    });

    test("Invalid User", async () => {
        const response = await sendToEndpoint(
            false,
            DB_IDS.mainPost,
            USER_JWT_TOKENS.missing
        );
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("Invalid userFromId");
    });

    test("No JWT token", async () => {
        const response = await sendToEndpoint(
            false,
            DB_IDS.mainPost
        );
        expect(response.statusCode).toBe(401);
    });
});