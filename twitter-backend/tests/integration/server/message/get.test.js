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

describe(`GET /channel/:channelId/messages endpoint`, () => {
    // run before each "test"
    beforeEach(async () => {
        await clearDatabase(diContainer);
        await populateDatabase(diContainer);
    });

    const sendToEndpoint = async (param, token) => {
        const endpoint = `/channel/${param}/messages`;
        if (!token) {
            return await request(app).get(endpoint).send();
        }
        return await request(app)
            .get(endpoint)
            .set('Authorization', `Bearer ${token}`)
            .send();
    };

    test("Success", async () => {
        const response = await sendToEndpoint(DB_IDS.mainChannel, USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(200);
        expect("messages" in response.body).toEqual(true);
        expect(response.body.messages.length).toEqual(1);
        expect(response.body.messages[0].id).toEqual(DB_IDS.mainMessage);
    });

    test("Invalid channelId", async () => {
        const response = await sendToEndpoint("invalid_channel_id", USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("Type cast failed for channel");
    });

    test("Missing channelId", async () => {
        const response = await sendToEndpoint('', USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(404);
    });

    test("No JWT token", async () => {
        const response = await sendToEndpoint(DB_IDS.mainChannel);
        expect(response.statusCode).toBe(401);
    });
});