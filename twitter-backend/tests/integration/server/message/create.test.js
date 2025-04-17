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
const endpoint = '/message';

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

    test("Success", async () => {
        const response = await sendToEndpoint({
            content: 'Hello!',
            channelId: DB_IDS.mainChannel
        }, USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(201);
        expect("id" in response.body).toEqual(true);
    });

    test("Invalid authorId", async () => {
        const response = await sendToEndpoint({
            content: 'Hello!',
            channelId: DB_IDS.mainChannel
        }, USER_JWT_TOKENS.missing);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual(
            "Author not in channel"
        );
    });

    test("Invalid channelId", async () => {
        const response = await sendToEndpoint({
            content: 'Hello!',
            channelId: 'invalid_channel'
        }, USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual(
            "Type cast failed for channel"
        );
    });

    test("Author not in channel", async () => {
        const response = await sendToEndpoint({
            content: 'Can I say something?',
            channelId: DB_IDS.mainChannel
        }, USER_JWT_TOKENS.another);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual(
            "Author not in channel"
        );
    });

    test("Missing content", async () => {
        const response = await sendToEndpoint({
            channelId: DB_IDS.mainChannel
        }, USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual(
            "Missing content"
        );
    });

    test("Missing channelId", async () => {
        const response = await sendToEndpoint({
            content: 'Hello!'
        }, USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual(
            "Missing channelId"
        );
    });

    test("No JWT token", async () => {
        const response = await sendToEndpoint({
            content: 'Hello!',
            channelId: DB_IDS.mainChannel
        });
        expect(response.statusCode).toBe(401);
    });
});