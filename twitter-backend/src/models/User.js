const mongoose = require("mongoose");
const {emailValidator} = require("../utils/validators");

const UserSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, index: true, unique: true},
        passwordHash: {type: String, required: true},
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: emailValidator,
                message: props => `${props.value} is not a valid email.`
            }
        },
        firstName: {type: String, required: true},
        lastName: {type: String, required: true}
    }
);

module.exports = mongoose.model("User", UserSchema);