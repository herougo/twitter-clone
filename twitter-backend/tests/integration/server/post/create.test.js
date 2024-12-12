const createApp = require("../../../../src/server/app");
const DI_NAMES = require("../../../../src/server/dependency-injection/names");
const request = require('supertest');
const createMockLogger = require("../../../utils/mocks/mockLogger");
const mongoose = require("mongoose");
const { populateDatabase, clearDatabase } = require("../../../utils/database/changeContents");
const { DB_IDS } = require("../../../utils/database/ids");

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

describe("POST /post/create endpoint", () => {
    // run before each "test"
    beforeEach(async () => {

    });

    test("Success (no parent)", async () => {
        const response = await request(app).post('/post/create').send({
            authorId: DB_IDS.mainUser,
            content: "Cats are cool",
            replyToId: null
        });
        expect(response.statusCode).toBe(201);
        expect("id" in response.body).toEqual(true);
    });

    test("Success (has parent)", async () => {
        const response = await request(app).post('/post/create').send({
            authorId: DB_IDS.mainUser,
            content: "Cats are cool",
            replyToId: DB_IDS.mainPost
        });
        expect(response.statusCode).toBe(201);
        expect("id" in response.body).toEqual(true);
    });

    test("Invalid User", async () => {
        const response = await request(app).post('/post/create').send({
            authorId: DB_IDS.missingUser,
            content: "Cats are cool",
            replyToId: null
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("Invalid author");
    });

    test("Invalid ReplyTo", async () => {
        const response = await request(app).post('/post/create').send({
            authorId: DB_IDS.mainUser,
            content: "Cats are cool",
            replyToId: DB_IDS.missingPost
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("Invalid parent post");
    });

    test("Missing authorId", async () => {
        const response = await request(app).post('/post/create').send({
            content: 'I like cats',
            replyToId: DB_IDS.mainPost
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("Missing authorId");
    });

    test("Missing content", async () => {
        const response = await request(app).post('/post/create').send({
            authorId: DB_IDS.mainUser,
            replyToId: DB_IDS.mainPost
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("Missing content");
    });
});