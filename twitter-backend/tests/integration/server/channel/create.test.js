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
const endpoint = '/channel/open';

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

describe(`POST ${endpoint} endpoint`, () => {
    // run before each "test"
    beforeEach(async () => {
        await clearDatabase(diContainer);
        await populateDatabase(diContainer);
    });

    
    
    const sendToEndpoint = async (payload, token) => {
        if (!token) {
            return await request(app).post(endpoint).send(payload);
        }

        return await request(app)
            .post(endpoint)
            .set('Authorization', `Bearer ${token}`)
            .send(payload);
    };

    test("Success (no create)", async () => {
        const response = await sendToEndpoint({
            userIds: [DB_IDS.mainUser, DB_IDS.followerUser]
        }, USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(200);
        expect("id" in response.body).toEqual(true);
        expect(response.body.id).toEqual(DB_IDS.mainChannel);
    });

    test("Success (reverse user order)", async () => {
        const response = await sendToEndpoint({
            userIds: [DB_IDS.followerUser, DB_IDS.mainUser]
        }, USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(200);
        expect("id" in response.body).toEqual(true);
        expect(response.body.id).toEqual(DB_IDS.mainChannel);
    });

    test("Success (create)", async () => {
        const response = await sendToEndpoint({
            userIds: [DB_IDS.mainUser, DB_IDS.anotherUser]
        }, USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(200);
        expect("id" in response.body).toEqual(true);
        expect(response.body.id).not.toEqual(DB_IDS.mainChannel);
    });

    test("1 User", async () => {
        const response = await sendToEndpoint({
            userIds: [DB_IDS.mainUser]
        }, USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual(
            "Cannot open a DM channel with 1 user(s) (must use 2)!"
        );
    });

    test("3 Users", async () => {
        const response = await sendToEndpoint({
            userIds: [DB_IDS.mainUser, DB_IDS.followerUser, DB_IDS.anotherUser]
        }, USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual(
            "Cannot open a DM channel with 3 user(s) (must use 2)!"
        );
    });

    test("Missing userIds", async () => {
        const response = await sendToEndpoint({}, USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual(
            "Missing userIds"
        );
    });

    test("No JWT token", async () => {
        const response = await sendToEndpoint({
            userIds: [DB_IDS.mainUser, DB_IDS.anotherUser]
        });
        expect(response.statusCode).toBe(401);
    });
});