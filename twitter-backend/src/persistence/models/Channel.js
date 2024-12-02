const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        isGroupChat: Boolean,
        lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }
    }
);

module.exports = mongoose.model("Channel", ChannelSchema);