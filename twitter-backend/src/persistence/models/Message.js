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

module.exports = mongoose.model("Message", MessageSchema);