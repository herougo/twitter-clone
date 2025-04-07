const createApp = require("../../../../src/server/app");
const DI_NAMES = require("../../../../src/server/dependency-injection/names");
const request = require('supertest');
const createMockLogger = require("../../../utils/mocks/mockLogger");
const mongoose = require("mongoose");
const { populateDatabase, clearDatabase } = require("../../../utils/database/changeContents");
const { DB_IDS } = require("../../../utils/database/ids");
const { NOTIFICATION_TYPES } = require("../../../../src/utils/enums");
const { USER_JWT_TOKENS } = require("../../../utils/database/userData");

let app;
let diContainer;
const endpoint = '/notification/markAsRead';

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

describe("POST /notification/markAsRead endpoint", () => {
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
            notificationId: DB_IDS.mainNotification
        }, USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(200);
    });

    test("Missing notificationId", async () => {
        const response = await sendToEndpoint({}, USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("Missing notificationId");
    });

    test("Invalid notificationId", async () => {
        const response = await sendToEndpoint({
            notificationId: DB_IDS.missingNotification
        }, USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("Invalid notificationId");
    });

    test("No JWT token", async () => {
        const response = await sendToEndpoint({
            notificationId: DB_IDS.mainNotification
        });
        expect(response.statusCode).toBe(401);
    });
});