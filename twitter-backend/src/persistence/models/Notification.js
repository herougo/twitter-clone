const mongoose = require("mongoose");
const { NOTIFICATION_TYPES } = require("../../utils/enums");

const NotificationSchema = new mongoose.Schema(
    {
        userTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        userFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        type: {
            type: String,
            enum : [
                NOTIFICATION_TYPES.like,
                NOTIFICATION_TYPES.dislike,
                NOTIFICATION_TYPES.follow
            ],
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
NotificationSchema.index({"createdAt": -1});

module.exports = mongoose.model("Notification", NotificationSchema);