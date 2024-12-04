const CONFIG = require("../../config");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { BadRequestError, UnauthorizedError } = require("../../utils/errors/expressErrors");
const { hashPassword } = require("../../utils/utils");
const { NOTIFICATION_TYPES } = require("../../utils/enums");
const { catchAndTransformMongooseError } = require("../../server/handlers");

class UserService {
    constructor({logger, userRepository}) {
        this.logger = logger;
        this.userRepository = userRepository;
    }

    async logIn(username, password) {
        if (!(username && password)) {
            throw new BadRequestError("A username or password is not provided");
        }
        const user = await catchAndTransformMongooseError(
            this.userRepository.findOneByUsername(username),
            this.logger,
            "user"
        );
        // null is returned if missing
        if (!user) {
            throw new BadRequestError("User is missing");
        }
        const expectedPasswordHash = user.passwordHash;
        const comparisonResult = await bcrypt.compare(password, expectedPasswordHash);
        
        if (!comparisonResult) {
            throw new UnauthorizedError("Password is invalid");
        }

        const tokenPayload = {username, expectedPasswordHash};
        const secretKey = CONFIG.jwtSecretKey;
        const token = jwt.sign(tokenPayload, secretKey);
        
        return {token};
    }

    async signUp(userData) {
        if (!userData) {
            throw new BadRequestError("Missing user in request");
        }

        const passwordHash = await hashPassword(userData.password);
        userData = {
            username: userData.username,
            passwordHash,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email 
        }

        const user = await catchAndTransformMongooseError(
            this.userRepository.create(userData),
            this.logger,
            "user"
        );
    }

    async follow(userId, followerId) {
        let user = null;
        let follower = null;

        user = await catchAndTransformMongooseError(
            this.userRepository.findOneById(userId),
            this.logger,
            "user"
        );
        if (!user) {
            throw BadRequestError("Follow: Invalid user");
        }

        follower = await catchAndTransformMongooseError(
            this.userRepository.findOneById(followerId),
            this.logger,
            "user"
        );
        if (!follower) {
            throw BadRequestError("Follow: Invalid follower");
        }
        
        await catchAndTransformMongooseError(
            this.userRepository.addFollower(user, follower),
            this.logger,
            "user"
        );

        this.notificationService.createNotification({
            userToId: userId,
            userFromId: followerId,
            type: NOTIFICATION_TYPES.follow
        });
    }
}

module.exports = UserService;