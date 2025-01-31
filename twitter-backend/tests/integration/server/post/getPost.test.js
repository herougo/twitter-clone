const createApp = require("../../../../src/server/app");
const DI_NAMES = require("../../../../src/server/dependency-injection/names");
const request = require('supertest');
const createMockLogger = require("../../../utils/mocks/mockLogger");
const mongoose = require("mongoose");
const { populateDatabase, clearDatabase } = require("../../../utils/database/changeContents");
const { DB_IDS } = require("../../../utils/database/ids");
const { sanitizePaths } = require("../../../utils/sanitization");

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

    const sendToEndpoint = async (param, loggedInUserId) => {
        let fullEndpoint = `${endpoint}/${param}`;
        if (loggedInUserId) {
            fullEndpoint += `?loggedInUserId=${loggedInUserId}`;
        }
        return await request(app).get(fullEndpoint).send();
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
        const response = await sendToEndpoint(DB_IDS.mainPost, DB_IDS.mainUser);
        expect(response.statusCode).toBe(200);
        const sanitizedBody = sanitizeBody(response.body);
        expect(sanitizedBody).toMatchSnapshot();
    });

    test("Success (without reply)", async () => {
        const response = await sendToEndpoint(DB_IDS.mainReply, DB_IDS.mainUser);
        expect(response.statusCode).toBe(200);
        const sanitizedBody = sanitizeBody(response.body);
        expect(sanitizedBody).toMatchSnapshot();
    });

    test("Invalid PostId", async () => {
        const response = await sendToEndpoint(DB_IDS.missingPost, DB_IDS.mainUser);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("GetPost: Invalid postId");
    });

    test("Missing loggedInUserId", async () => {
        const response = await sendToEndpoint(DB_IDS.mainPost);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toEqual("GetPost: Missing loggedInUserId");
    });

    test("Missing postId", async () => {
        const response = await sendToEndpoint('');
        expect(response.statusCode).toBe(404);
    });
});