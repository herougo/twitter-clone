const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema(
    {
        users: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User',
            required: true,
            validate: {
                validator: (users) => { return users.length >= 2 },
                message: props => `${props.value} is not valid.`
            }
        },
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            default: null
        },
        lastMessageSentAt: {
            type : Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

// for retrieving channels quickly
ChannelSchema.index([["users", 1], ["lastMessageSentAt", -1]]);


module.exports = mongoose.model("Channel", ChannelSchema);