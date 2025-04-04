const createApp = require("../../../../src/server/app");
const DI_NAMES = require("../../../../src/server/dependency-injection/names");
const request = require('supertest');
const createMockLogger = require("../../../utils/mocks/mockLogger");
const mongoose = require("mongoose");
const { populateDatabase, clearDatabase } = require("../../../utils/database/changeContents");
const { DB_IDS } = require("../../../utils/database/ids");
const { sanitizePaths } = require("../../../utils/sanitization");
const { USER_JWT_TOKENS } = require("../../../utils/database/userData");

let app;
let diContainer;
const endpoint = '/post';

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

describe("GET /post/:postId endpoint", () => {
    // run before each "test"
    beforeEach(async () => {
        await clearDatabase(diContainer);
        await populateDatabase(diContainer);
    });

    const sendToEndpoint = async (param, token) => {
        const fullEndpoint = `${endpoint}/${param}`;
        if (!token) {
            return await request(app)
                .get(fullEndpoint)
                .send();
        }

        return await request(app)
            .get(fullEndpoint)
            .set('Authorization', `Bearer ${token}`)
            .send();
    };

    const sanitizePost = (post) => {
        return sanitizePaths(
            post,
            ['createdDate', 'replyTo.createdDate'],
            ''
        );
    }

    const sanitizeBody = (body) => {
        return {
            post: sanitizePost(body.post),
            replies: body.replies.map(sanitizePost)
        }
    };

    test("Success (with reply)", async () => {
        const response = await sendToEndpoint(DB_IDS.mainPost, USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(200);
        const sanitizedBody = sanitizeBody(response.body);
        expect(sanitizedBody).toMatchSnapshot();
    });

    test("Success (without reply)", async () => {
        const response = await sendToEndpoint(DB_IDS.mainReply, USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(200);
        const sanitizedBody = sanitizeBody(response.body);
        expect(sanitizedBody).toMatchSnapshot();
    });

    test("Invalid PostId", async () => {
        const response = await sendToEndpoint(DB_IDS.missingPost, USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("GetPost: Invalid postId");
    });

    test("Missing postId", async () => {
        const response = await sendToEndpoint('', USER_JWT_TOKENS.main);
        expect(response.statusCode).toBe(404);
    });

    test("No JWT token", async () => {
        const response = await sendToEndpoint(DB_IDS.mainReply);
        expect(response.statusCode).toBe(401);
    });
});