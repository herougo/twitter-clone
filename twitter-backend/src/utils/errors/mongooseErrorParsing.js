const mongoose = require("mongoose");
const mongodb = require("mongodb");

MONGODB_DUPLICATE_KEY_ERROR_CODE = 11000


MONGOOSE_ERROR_TYPES = {
    other: 0,
    validation: 1,
    duplicateKey: 2,
    typeCast: 3
}

const isMongooseError = (e) => {
    return e instanceof mongoose.MongooseError || e instanceof mongodb.MongoError;
}

const classifyMongooseError = (e) => {
    if (e instanceof mongoose.Error.CastError) {
        return MONGOOSE_ERROR_TYPES.typeCast
    } else if (e instanceof mongoose.Error.ValidationError) {
        return MONGOOSE_ERROR_TYPES.validation
    } else if (e instanceof mongodb.MongoServerError && e.code === MONGODB_DUPLICATE_KEY_ERROR_CODE) {
        return MONGOOSE_ERROR_TYPES.duplicateKey;
    } else {
        return MONGOOSE_ERROR_TYPES.other
    }
}

module.exports = {
    MONGOOSE_ERROR_TYPES,
    isMongooseError,
    classifyMongooseError
}