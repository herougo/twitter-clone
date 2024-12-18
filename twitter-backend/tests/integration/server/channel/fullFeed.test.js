const createApp = require("../../../../src/server/app");
const DI_NAMES = require("../../../../src/server/dependency-injection/names");
const request = require('supertest');
const createMockLogger = require("../../../utils/mocks/mockLogger");
const mongoose = require("mongoose");
const { populateDatabase, clearDatabase } = require("../../../utils/database/changeContents");
const { DB_IDS } = require("../../../utils/database/ids");

let app;
let diContainer;
const endpoint = '/channel/fullFeed';

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

describe(`GET ${endpoint} endpoint`, () => {
    // run before each "test"
    beforeEach(async () => {
        await clearDatabase(diContainer);
        await populateDatabase(diContainer);
    });

    test("Success (1 main channel)", async () => {
        const response = await request(app).get(endpoint).send({
            userId: DB_IDS.mainUser
        });
        expect(response.statusCode).toBe(200);
        expect("channels" in response.body).toEqual(true);
        expect(response.body.channels.length).toEqual(1);
        expect(response.body.channels[0].id).toEqual(DB_IDS.mainChannel);
    });

    test("Success (1 follower channel)", async () => {
        const response = await request(app).get(endpoint).send({
            userId: DB_IDS.followerUser
        });
        expect(response.statusCode).toBe(200);
        expect("channels" in response.body).toEqual(true);
        expect(response.body.channels.length).toEqual(1);
        expect(response.body.channels[0].id).toEqual(DB_IDS.mainChannel);
    });

    test("Success (empty)", async () => {
        const response = await request(app).get(endpoint).send({
            userId: DB_IDS.anotherUser
        });
        expect(response.statusCode).toBe(200);
        expect("channels" in response.body).toEqual(true);
        expect(response.body.channels.length).toEqual(0);
    });

    test("Invalid User", async () => {
        const response = await request(app).get(endpoint).send({
            userId: "invalid_user"
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("Type cast failed for channel");
    });

    test("Missing userId", async () => {
        const response = await request(app).get(endpoint).send({});
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual(
            "Missing userId"
        );
    });
});