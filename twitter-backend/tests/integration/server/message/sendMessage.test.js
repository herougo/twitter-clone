const createApp = require("../../../../src/server/app");
const DI_NAMES = require("../../../../src/server/dependency-injection/names");
const request = require('supertest');
const createMockLogger = require("../../../utils/mocks/mockLogger");
const mongoose = require("mongoose");
const { populateDatabase, clearDatabase } = require("../../../utils/database/changeContents");
const { DB_IDS } = require("../../../utils/database/ids");

let app;
let diContainer;
const endpoint = '/message/send';

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

    test("Success", async () => {
        const response = await request(app).post(endpoint).send({
            content: 'Hello!',
            authorId: DB_IDS.mainUser,
            channelId: DB_IDS.mainChannel
        });
        expect(response.statusCode).toBe(201);
        expect("id" in response.body).toEqual(true);
    });

    test("Invalid authorId", async () => {
        const response = await request(app).post(endpoint).send({
            content: 'Hello!',
            authorId: 'Invalid_user',
            channelId: DB_IDS.mainChannel
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual(
            "Author not in channel"
        );
    });

    test("Invalid channelId", async () => {
        const response = await request(app).post(endpoint).send({
            content: 'Hello!',
            authorId: DB_IDS.mainUser,
            channelId: 'invalid_channel'
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual(
            "Type cast failed for channel"
        );
    });

    test("Author not in channel", async () => {
        const response = await request(app).post(endpoint).send({
            content: 'Can I say something?',
            authorId: DB_IDS.anotherUser,
            channelId: DB_IDS.mainChannel
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual(
            "Author not in channel"
        );
    });

    test("Missing content", async () => {
        const response = await request(app).post(endpoint).send({
            authorId: DB_IDS.mainUser,
            channelId: DB_IDS.mainChannel
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual(
            "Missing content"
        );
    });

    test("Missing authorId", async () => {
        const response = await request(app).post(endpoint).send({
            content: 'Hello!',
            channelId: DB_IDS.mainChannel
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual(
            "Missing authorId"
        );
    });

    test("Missing channelId", async () => {
        const response = await request(app).post(endpoint).send({
            content: 'Hello!',
            authorId: DB_IDS.mainUser
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual(
            "Missing channelId"
        );
    });
});