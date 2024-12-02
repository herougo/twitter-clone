const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: {type: String, required: true},
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
        replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Post", PostSchema);