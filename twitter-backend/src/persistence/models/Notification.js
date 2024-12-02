const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
    {
        userTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        userFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        type: {
            type: String,
            enum : ['like','dislike', 'follow'],
        },
        read: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Notification", NotificationSchema);