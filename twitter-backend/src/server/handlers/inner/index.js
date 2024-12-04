const { ExpressError, BadRequestError, ServerError } = require("../errors/expressErrors");
const { isMongooseError, classifyMongooseError, MONGOOSE_ERROR_TYPES } = require("../errors/mongooseErrorParsing");

async function catchAndTransformMongooseError(promise, logger, mongoDataType) {
    try {
        return await promise;
    } catch(e) {
        if (isMongooseError(e)) {
            const errorType = classifyMongooseError(e);
            switch (errorType) {
                case MONGOOSE_ERROR_TYPES.validation:
                    throw new BadRequestError(`Invalid ${mongoDataType} details`);
                case MONGOOSE_ERROR_TYPES.duplicateKey:
                    throw new BadRequestError(`This ${mongoDataType} exists already`);
                case MONGOOSE_ERROR_TYPES.other:
                    logger.warn(`Unrecognized mongodb error type: ${e}`);
                    throw new ServerError();
            }
        }
        throw e;
    }
}

module.exports = { catchAndTransformMongooseError };