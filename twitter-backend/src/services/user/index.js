const CONFIG = require("../../config");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { isMongooseError, classifyMongooseError, MONGOOSE_ERROR_TYPES } = require("../../utils/errors/mongooseErrorParsing");
const { BadRequestError, ExpressError, ServerError, UnauthorizedError } = require("../../utils/errors/expressErrors");
const { hashPassword } = require("../../utils/utils");

class UserService {
    constructor({logger, userRepository}) {
        this.logger = logger;
        this.userRepository = userRepository;
    }

    async logIn(username, password) {
        try {
            if (!(username && password)) {
                throw new BadRequestError("A username or password is not provided");
            }
            const user = await this.userRepository.findOneByUsername(username);
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
        } catch (e) {
            this.logger.error(e);
            if (e instanceof ExpressError) {
                throw e;
            }
            throw new ServerError();
        }
        
    }

    async signUp(userData) {
        try {
            if (!userData) {
                throw new BadRequestError("Missing user");
            }

            const passwordHash = await hashPassword(userData.password);
            userData = {
                username: userData.username,
                passwordHash,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email 
            }

            const user = await this.userRepository.create(userData);

        } catch (e) {
            this.logger.error(e);
            if (isMongooseError(e)) {
                const errorType = classifyMongooseError(e);
                switch (errorType) {
                    case MONGOOSE_ERROR_TYPES.validation:
                        throw new BadRequestError("Invalid user details");
                    case MONGOOSE_ERROR_TYPES.duplicateKey:
                        throw new BadRequestError("User exists already");
                    case MONGOOSE_ERROR_TYPES.other:
                        this.logger.warn("Unrecognized mongodb error type");
                        throw new ServerError();
                }
            }
            throw new ServerError();
        }
    }
}

module.exports = UserService;