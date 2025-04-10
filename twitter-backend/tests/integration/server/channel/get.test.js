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
const endpoint = '/channel';

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

    const sendToEndpoint = async (token) => {
        if (!token) {
            return await request(app).get(endpoint).send();
        }

        return await request(app)
            .get(endpoint)
            .set('Authorization', `Bearer ${token}`)
            .send();
    };

    test("Success (1 main channel)", async () => {
        const response = await sendToEndpoint(USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(200);
        expect("channels" in response.body).toEqual(true);
        expect(response.body.channels.length).toEqual(1);
        expect(response.body.channels[0].id).toEqual(DB_IDS.mainChannel);
        expect(response.body.users.length).toEqual(1);
        expect(response.body.users[0].id).toEqual(DB_IDS.followerUser);
    });

    test("Success (1 follower channel)", async () => {
        const response = await sendToEndpoint(USER_JWT_TOKENS.follower);
        expect(response.statusCode).toBe(200);
        expect("channels" in response.body).toEqual(true);
        expect(response.body.channels.length).toEqual(1);
        expect(response.body.channels[0].id).toEqual(DB_IDS.mainChannel);
        expect(response.body.users.length).toEqual(1);
        expect(response.body.users[0].id).toEqual(DB_IDS.mainUser);
    });

    test("Success (empty)", async () => {
        const response = await sendToEndpoint(USER_JWT_TOKENS.another);
        expect(response.statusCode).toBe(200);
        expect("channels" in response.body).toEqual(true);
        expect(response.body.channels.length).toEqual(0);
        expect(response.body.users.length).toEqual(0);
    });

    test("No JWT token", async () => {
        const response = await sendToEndpoint();
        expect(response.statusCode).toBe(401);
    });
});