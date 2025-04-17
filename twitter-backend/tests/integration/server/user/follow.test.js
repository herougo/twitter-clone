const createApp = require("../../../../src/server/createApp");
const DI_NAMES = require("../../../../src/server/dependency-injection/names");
const request = require('supertest');
const createMockLogger = require("../../../utils/mocks/mockLogger");
const mongoose = require("mongoose");
const { populateDatabase, clearDatabase } = require("../../../utils/database/changeContents");
const { DB_IDS } = require('../../../utils/database/ids');
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

    await clearDatabase(diContainer);
    await populateDatabase(diContainer);
});

// run once after all suites in the file
afterAll(async () => {
    await mongoose.connection.close(); // neccessary to avoid a jest error
});

describe("POST /user/id/:userId/follow endpoint", () => {
    // run before each "test"
    beforeEach(async () => {
        await clearDatabase(diContainer);
        await populateDatabase(diContainer);
    });

    const sendToEndpoint = async (userId, token) => {
        if (!token) {
            return await request(app)
                .post(`/user/id/${userId}/follow`)
                .send();
        }

        return await request(app)
            .post(`/user/id/${userId}/follow`)
            .set('Authorization', `Bearer ${token}`)
            .send();
    };

    test("Success", async () => {
        const response = await sendToEndpoint(
            DB_IDS.followerUser, USER_JWT_TOKENS.main
        );
        expect(response.statusCode).toBe(200);
    });

    test("User not in DB", async () => {
        const response = await sendToEndpoint(
            DB_IDS.missingUser, USER_JWT_TOKENS.main
        );
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("Follow: Invalid user");
    });

    test("Follower not in DB", async () => {
        const response = await sendToEndpoint(
            DB_IDS.mainUser, USER_JWT_TOKENS.missing
        );
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("Follow: Invalid follower");
    });

    test("Already following", async () => {
        const response = await sendToEndpoint(
            DB_IDS.mainUser, USER_JWT_TOKENS.follower
        );
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("Follow: Already following");
    });

    test("No JWT token", async () => {
        const response = await sendToEndpoint(
            DB_IDS.followerUser
        );
        expect(response.statusCode).toBe(401);
    });
});