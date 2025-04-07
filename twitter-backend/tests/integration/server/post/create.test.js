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

describe("POST /post endpoint", () => {
    // run before each "test"
    beforeEach(async () => {
        await clearDatabase(diContainer);
        await populateDatabase(diContainer);
    });

    const sendToEndpoint = async (payload, token) => {
        if (!token) {
            return await request(app)
                .post('/post')
                .send(payload);
        }

        return await request(app)
            .post('/post')
            .set('Authorization', `Bearer ${token}`)
            .send(payload);
    };

    test("Success (no parent)", async () => {
        const response = await sendToEndpoint({
            content: "Cats are cool",
            replyToId: null
        }, USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(201);
        expect("id" in response.body).toEqual(true);
    });

    test("Success (has parent)", async () => {
        const response = await sendToEndpoint({
            content: "Cats are cool",
            replyToId: DB_IDS.mainPost
        }, USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(201);
        expect("id" in response.body).toEqual(true);
    });

    test("Invalid User", async () => {
        const response = await sendToEndpoint({
            content: "Cats are cool",
            replyToId: null
        }, USER_JWT_TOKENS.missing);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("Invalid author");
    });

    test("Invalid ReplyTo", async () => {
        const response = await sendToEndpoint({
            content: "Cats are cool",
            replyToId: DB_IDS.missingPost
        }, USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("Invalid parent post");
    });

    test("Missing content", async () => {
        const response = await sendToEndpoint({
            replyToId: DB_IDS.mainPost
        }, USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("Missing content");
    });

    test("No JWT token", async () => {
        const response = await sendToEndpoint({
            content: "Cats are cool",
            replyToId: null
        });
        expect(response.statusCode).toBe(401);
    });
});