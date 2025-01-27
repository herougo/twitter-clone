const CONFIG = require("../../config");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { BadRequestError, UnauthorizedError } = require("../../utils/errors/expressErrors");
const { hashPassword } = require("../../utils/utils");
const { NOTIFICATION_TYPES } = require("../../utils/enums");
const { catchAndTransformMongooseError } = require("../../server/handlers");

class UserService {
    constructor({logger, notificationService, userRepository}) {
        this.logger = logger;
        this.notificationService = notificationService;
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
        
        return {userId: user.id, token};
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

    async follow(followerId, userId) {
        let user = null;
        let follower = null;

        user = await catchAndTransformMongooseError(
            this.userRepository.findById(userId),
            this.logger,
            "user"
        );
        if (!user) {
            throw new BadRequestError("Follow: Invalid user");
        }

        follower = await catchAndTransformMongooseError(
            this.userRepository.findById(followerId),
            this.logger,
            "user"
        );
        if (!follower) {
            throw new BadRequestError("Follow: Invalid follower");
        }

        if (user.followers.includes(follower._id)) {
            throw new BadRequestError("Follow: Already following");
        }
        
        await catchAndTransformMongooseError(
            this.userRepository.addFollower(user, follower),
            this.logger,
            "user"
        );

        await this.notificationService.createNotification({
            userToId: userId,
            userFromId: followerId,
            type: NOTIFICATION_TYPES.follow
        });
    }

    async unfollow(followerId, userId) {
        let user = null;
        let follower = null;

        user = await catchAndTransformMongooseError(
            this.userRepository.findById(userId),
            this.logger,
            "user"
        );
        if (!user) {
            throw new BadRequestError("Unfollow: Invalid user");
        }

        follower = await catchAndTransformMongooseError(
            this.userRepository.findById(followerId),
            this.logger,
            "user"
        );
        if (!follower) {
            throw new BadRequestError("Unfollow: Invalid follower");
        }

        if (!user.followers.includes(follower._id)) {
            throw new BadRequestError("Unfollow: Not already following");
        }
        
        await catchAndTransformMongooseError(
            this.userRepository.removeFollower(user, follower),
            this.logger,
            "user"
        );
    }

    async getProfile(username, loggedInUserId) {
        if (!username) {
            throw new BadRequestError("GetProfile: Missing user");
        }

        if (!loggedInUserId) {
            throw new BadRequestError("GetProfile: Missing loggedInUserId");
        }

        const user = await catchAndTransformMongooseError(
            this.userRepository.findOneByUsername(username),
            this.logger,
            "user"
        );
        if (!user) {
            throw new BadRequestError("GetProfile: Invalid user");
        }

        let isFollowing = false;
        if (user.followers) {
            isFollowing = user.followers.includes(loggedInUserId);
        }
        
        return {
            id: user.id,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            numFollowing: user.following?.length || 0,
            numFollowers: user.followers?.length || 0,
            isFollowing
        };
    }
}

module.exports = UserService;