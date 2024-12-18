const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: {type: String, required: true},
        channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' },
    },
    {
        timestamps: true
    }
);

MessageSchema.index([['channel', 1], ['createdAt', -1]])

module.exports = mongoose.model("Message", MessageSchema);