const createApp = require("../../../../src/server/createApp");
const DI_NAMES = require("../../../../src/server/dependency-injection/names");
const request = require('supertest');
const createMockLogger = require("../../../utils/mocks/mockLogger");
const mongoose = require("mongoose");
const { populateDatabase, clearDatabase } = require("../../../utils/database/changeContents");
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

describe("GET /user/name/:username/profile/ endpoint", () => {
    // run before each "test"
    beforeEach(async () => {
        await clearDatabase(diContainer);
        await populateDatabase(diContainer);
    });

    const sendToEndpoint = async (param, token) => {
        let fullEndpoint = `/user/name/${param}/profile/`;
        if (!token) {
            return await request(app).get(fullEndpoint).send();
        }
        return await request(app)
            .get(fullEndpoint)
            .set('Authorization', `Bearer ${token}`)
            .send();
    };

    test("Success", async () => {
        const response = await sendToEndpoint('username', USER_JWT_TOKENS.another);
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchSnapshot();
    });

    test("Success isFollowing", async () => {
        const response = await sendToEndpoint('username', USER_JWT_TOKENS.follower);
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchSnapshot();
    });

    test("User not in DB", async () => {
        const response = await sendToEndpoint('missingUser', USER_JWT_TOKENS.follower);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("GetProfile: Invalid user");
    });

    test("Missing username", async () => {
        const response = await sendToEndpoint('', USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(404);
    });

    test("No JWT token", async () => {
        const response = await sendToEndpoint('username');
        expect(response.statusCode).toBe(401);
    });
});