const jwt = require("jsonwebtoken");
const CONFIG = require("../../../src/config");
const { DB_IDS } = require("./ids");


function logJWT(data) {
    const tokenPayload = {
        username: data.username,
        id: data._id,
        expectedPasswordHash: data.passwordHash
    };
    const secretKey = CONFIG.jwtSecretKey;
    
    console.log(jwt.sign(tokenPayload, secretKey));
}


const USER_DATA = {
    main: {
        _id: DB_IDS.mainUser,
        username: "username",
        passwordHash: "$2b$10$AbJt1PaeMfPOOuI7lmgiYOMYv2vL/WGtGV1TuMAjjSo0jAZt1hQ2.",
        firstName: "hi",
        lastName: "there",
        email: "example@example.com"
    },
    follower: {
        _id: DB_IDS.followerUser,
        username: "follower",
        passwordHash: "$2b$10$AbJt1PaeMfPOOuI7lmgiYOMYv2vL/WGtGV1TuMAjjSo0jAZt1hQ2.",
        firstName: "hello",
        lastName: "you",
        email: "follower@example.com"
    },
    another: {
        _id: DB_IDS.anotherUser,
        username: "another",
        passwordHash: "$2b$10$AbJt1PaeMfPOOuI7lmgiYOMYv2vL/WGtGV1TuMAjjSo0jAZt1hQ2.",
        firstName: "hiya",
        lastName: "me",
        email: "another@example.com"
    },
    missing: {
        _id: DB_IDS.missingUser,
        username: "missing",
        passwordHash: "$2b$10$AbJt1PaeMfPOOuI7lmgiYOMYv2vL/WGtGV1TuMAjjSo0jAZt1hQ2."
    }
};

const USER_JWT_TOKENS = {
    main: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWQiOiI2NzUzNTFkNjk4NDUyZTRmYWRjMzc2YmUiLCJleHBlY3RlZFBhc3N3b3JkSGFzaCI6IiQyYiQxMCRBYkp0MVBhZU1mUE9PdUk3bG1naVlPTVl2MnZML1dHdEdWMVR1TUFqalNvMGpBWnQxaFEyLiIsImlhdCI6MTc0MzcyMzM4OX0.S-m8EStyU7QWDwn9QRD5DUHPnONrZi-cDNLVby7DVUo',
    follower: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZvbGxvd2VyIiwiaWQiOiI2NzUzNTFkNjk4NDUyZTRmYWRjMzc2YzEiLCJleHBlY3RlZFBhc3N3b3JkSGFzaCI6IiQyYiQxMCRBYkp0MVBhZU1mUE9PdUk3bG1naVlPTVl2MnZML1dHdEdWMVR1TUFqalNvMGpBWnQxaFEyLiIsImlhdCI6MTc0MzcyMzM4OX0.3sI__5vTDqNU4cHfdGmnwZq6XdA7_jgfUFs7UVnppr0',
    another: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFub3RoZXIiLCJpZCI6IjY3NTM1MWQ2OTg0NTJlNGZhZGMzNzZjMCIsImV4cGVjdGVkUGFzc3dvcmRIYXNoIjoiJDJiJDEwJEFiSnQxUGFlTWZQT091STdsbWdpWU9NWXYydkwvV0d0R1YxVHVNQWpqU28wakFadDFoUTIuIiwiaWF0IjoxNzQzNzIzMzg5fQ.0H3TNbsJl7EOLBss11MgIHtkhOgh1Jwe0Pc_lHiyxOw',
    missing: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pc3NpbmciLCJpZCI6IjY3NTM1MWQ2OTg0NTJlNGZhZGMzNzZjMiIsImV4cGVjdGVkUGFzc3dvcmRIYXNoIjoiJDJiJDEwJEFiSnQxUGFlTWZQT091STdsbWdpWU9NWXYydkwvV0d0R1YxVHVNQWpqU28wakFadDFoUTIuIiwiaWF0IjoxNzQzNzk5OTgzfQ.asPXotDxNSH3fdU0LUnZfa_B_20eTyXOuOmVpj-00oA'
};

module.exports = {
    USER_DATA, USER_JWT_TOKENS
}